/**
 * 支付异步通知回调控制器
 * 功能：接收支付宝/微信服务器的支付结果通知
 * 验证签名并更新订单状态
 * 
 * 注意：
 * - 支付宝和微信会通过POST请求主动通知服务器支付结果
 * - 服务器收到通知后必须返回成功标识，否则会重复发送
 * - 必须验证签名，防止伪造通知
 */
const { AlipaySdk } = require('alipay-sdk');
const crypto = require('crypto');
const config = require(path.resolve(__basename, 'config/config.js'));

// 初始化支付宝SDK
const alipaySdk = new AlipaySdk({
  appId: config.alipay?.appId || 'your_alipay_app_id',
  privateKey: config.alipay?.privateKey || '',
  alipayPublicKey: config.alipay?.alipayPublicKey || '',
  gateway: config.alipay?.gateway || 'https://openapi.alipay.com/gateway.do',
  signType: 'RSA2',
});

/**
 * 支付宝异步通知回调
 * 支付宝会在支付完成后POST通知到此接口
 */
module.exports.alipayNotify = async (req, res) => {
  try {
    const notifyData = req.body;

    console.log('收到支付宝异步通知:', notifyData);

    // 第一步：验证签名，防止伪造通知
    const isSignValid = alipaySdk.checkNotifySign(notifyData);

    if (!isSignValid) {
      console.error('支付宝通知签名验证失败');
      return res.send('fail'); // 返回fail，支付宝会重复发送通知
    }

    // 第二步：验证通知数据
    const {
      trade_status, // 交易状态
      out_trade_no, // 商户订单号
      trade_no, // 支付宝交易号
      total_amount, // 订单金额
      app_id, // 支付宝APPID
    } = notifyData;

    // 验证APPID
    if (app_id !== config.alipay?.appId) {
      console.error('支付宝APPID不匹配');
      return res.send('fail');
    }

    // 第三步：根据交易状态处理订单
    if (trade_status === 'TRADE_SUCCESS' || trade_status === 'TRADE_FINISHED') {
      // 支付成功，更新订单状态

      console.log('支付宝支付成功，订单号:', out_trade_no, '交易号:', trade_no);

      // TODO: 在这里更新订单状态
      // 示例：
      // await api.updateData('order', 
      //   { type: '2', // 2表示待发货
      //     payStatus: '1', // 1表示已支付
      //     tradeNo: trade_no, // 保存支付宝交易号
      //     payTime: new Date() },
      //   { where: { orderId: out_trade_no } }
      // );

      // TODO: 可以在这里添加业务逻辑
      // - 发送支付成功通知给用户
      // - 更新库存
      // - 记录支付日志
      // - 触发其他业务流程

      // 返回success，告知支付宝通知已接收
      res.send('success');
    } else {
      // 支付失败或关闭
      console.log('支付宝支付未完成，状态:', trade_status);
      res.send('success');
    }
  } catch (error) {
    console.error('处理支付宝通知失败:', error);
    res.send('fail');
  }
};

/**
 * 微信支付异步通知回调
 * 微信会在支付完成后POST通知到此接口
 */
module.exports.wechatPayNotify = async (req, res) => {
  try {
    // 微信支付通知是XML格式
    const xmlData = req.body;
    const notifyData = parseXmlToObject(xmlData);

    console.log('收到微信异步通知:', notifyData);

    // 第一步：验证签名，防止伪造通知
    const isSignValid = verifyWechatSign(notifyData, config.wechat?.apiKey || 'your_api_key');

    if (!isSignValid) {
      console.error('微信通知签名验证失败');
      return res.send(buildWechatResponse('FAIL', '签名验证失败'));
    }

    // 第二步：验证通知数据
    const {
      return_code, // 返回状态码
      result_code, // 业务结果
      out_trade_no, // 商户订单号
      transaction_id, // 微信支付订单号
      total_fee, // 订单金额（分）
      appid, // 微信APPID
    } = notifyData;

    // 验证返回码
    if (return_code !== 'SUCCESS') {
      console.error('微信通知返回失败:', notifyData.return_msg);
      return res.send(buildWechatResponse('FAIL', notifyData.return_msg));
    }

    // 验证APPID
    if (appid !== config.wechat?.appId) {
      console.error('微信APPID不匹配');
      return res.send(buildWechatResponse('FAIL', 'APPID不匹配'));
    }

    // 第三步：根据业务结果处理订单
    if (result_code === 'SUCCESS') {
      // 支付成功，更新订单状态

      console.log('微信支付成功，订单号:', out_trade_no, '交易号:', transaction_id);

      // TODO: 在这里更新订单状态
      // 示例：
      // await api.updateData('order',
      //   { type: '2', // 2表示待发货
      //     payStatus: '1', // 1表示已支付
      //     tradeNo: transaction_id, // 保存微信交易号
      //     payTime: new Date() },
      //   { where: { orderId: out_trade_no } }
      // );

      // TODO: 可以在这里添加业务逻辑
      // - 发送支付成功通知给用户
      // - 更新库存
      // - 记录支付日志
      // - 触发其他业务流程

      // 返回成功，告知微信通知已接收
      res.send(buildWechatResponse('SUCCESS', 'OK'));
    } else {
      // 支付失败
      console.log('微信支付失败:', notifyData.err_code_des);
      res.send(buildWechatResponse('SUCCESS', 'OK'));
    }
  } catch (error) {
    console.error('处理微信通知失败:', error);
    res.send(buildWechatResponse('FAIL', '处理失败'));
  }
};

/**
 * 验证微信支付签名
 * @param {Object} params - 通知参数
 * @param {String} apiKey - 商户API密钥
 * @returns {Boolean} 签名是否有效
 */
function verifyWechatSign(params, apiKey) {
  const sign = params.sign;
  if (!sign) return false;

  // 移除sign字段
  const { sign: _, ...paramsWithoutSign } = params;

  // 生成签名
  const calculatedSign = generateWechatSign(paramsWithoutSign, apiKey);

  return sign === calculatedSign;
}

/**
 * 生成微信支付签名
 */
function generateWechatSign(params, apiKey) {
  // 1. 参数名ASCII码从小到大排序
  const sortedParams = Object.keys(params)
    .sort()
    .filter((key) => params[key] !== '' && params[key] != null)
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  // 2. 在字符串末尾加上 key=商户API密钥
  const stringSignTemp = `${sortedParams}&key=${apiKey}`;

  // 3. MD5加密并转大写
  return crypto.createHash('md5').update(stringSignTemp, 'utf8').digest('hex').toUpperCase();
}

/**
 * 构建微信响应XML
 */
function buildWechatResponse(returnCode, returnMsg) {
  return `<xml><return_code><![CDATA[${returnCode}]]></return_code><return_msg><![CDATA[${returnMsg}]]></return_msg></xml>`;
}

/**
 * 将XML转换为对象
 */
function parseXmlToObject(xml) {
  const obj = {};
  const regex = /<([^>]+)><!\[CDATA\[([^\]]*)\]\]><\/\1>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    obj[match[1]] = match[2];
  }
  return obj;
}
