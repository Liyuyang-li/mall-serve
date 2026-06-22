/**
 * 创建支付订单控制器
 * 功能：根据订单ID和支付方式，调用支付宝或微信API生成支付参数
 * 返回给前端用于调起支付SDK
 */
const { AlipaySdk } = require('alipay-sdk');
const crypto = require('crypto');
const config = require(path.resolve(__basename, 'config/config.js'));

// 初始化支付宝SDK
// 注意：以下配置需要在正式环境中替换为真实的支付宝开放平台应用信息
const alipaySdk = new AlipaySdk({
  appId: config.alipay?.appId || 'your_alipay_app_id', // 支付宝应用APPID
  privateKey: config.alipay?.privateKey || '', // 应用私钥（PKCS1格式）
  alipayPublicKey: config.alipay?.alipayPublicKey || '', // 支付宝公钥
  gateway: config.alipay?.gateway || 'https://openapi.alipay.com/gateway.do', // 支付宝网关
  signType: 'RSA2', // 签名算法，推荐使用RSA2
});

/**
 * 创建支付订单接口
 * 请求参数：
 *   - orderIds: 订单ID列表（逗号分隔）
 *   - payMethod: 支付方式（alipay 或 wechat）
 *   - totalPrice: 订单总金额
 * 返回：
 *   - alipay: 返回 orderInfo（用于调起支付宝SDK）
 *   - wechat: 返回微信统一下单参数
 */
module.exports = async (req, res) => {
  try {
    const { orderIds, payMethod, totalPrice } = req.body;
    const userId = req.uid; // 从token中获取用户ID

    console.log('创建支付订单参数:', { orderIds, payMethod, totalPrice, userId });

    // 参数校验
    if (!orderIds || !payMethod || !totalPrice) {
      return res.send({
        msg: '参数不完整',
        status: 1501,
      });
    }

    // 生成商户订单号（唯一）
    const outTradeNo = 'PAY_' + new Date().getTime() + '_' + Math.random().toString(36).substr(2, 9);

    // 根据支付方式生成对应的支付参数
    if (payMethod === 'alipay') {
      // ========== 支付宝支付 ==========
      const payParams = await createAlipayOrder({
        outTradeNo,
        orderIds,
        totalPrice,
        userId,
      });

      return res.send({
        msg: '获取支付参数成功',
        status: 1500,
        data: {
          payMethod: 'alipay',
          outTradeNo, // 商户订单号，用于后续查询和回调
          orderInfo: payParams, // 支付宝订单信息，用于调起支付宝SDK
        },
      });
    } else if (payMethod === 'wechat') {
      // ========== 微信支付 ==========
      const payParams = await createWechatPayOrder({
        outTradeNo,
        orderIds,
        totalPrice,
        userId,
      });

      return res.send({
        msg: '获取支付参数成功',
        status: 1500,
        data: payParams,
      });
    } else {
      return res.send({
        msg: '不支持的支付方式',
        status: 1502,
      });
    }
  } catch (error) {
    console.error('创建支付订单失败:', error);
    return res.send({
      msg: '创建支付订单失败',
      status: 1503,
      data: error.message,
    });
  }
};

/**
 * 创建支付宝订单
 * 使用支付宝APP支付接口（alipay.trade.app.pay）
 * 返回 orderInfo 字符串，前端用于调起支付宝SDK
 */
async function createAlipayOrder({ outTradeNo, orderIds, totalPrice, userId }) {
  try {
    // 调用支付宝APP支付接口
    // 接口文档：https://opendocs.alipay.com/open/02ekfi
    const result = await alipaySdk.exec(
      'alipay.trade.app.pay', // 接口名称
      {
        // 业务参数
        bizContent: {
          outTradeNo, // 商户订单号
          totalAmount: totalPrice, // 订单总金额（单位：元）
          subject: '商城订单支付', // 订单标题
          body: `订单号：${orderIds}`, // 订单描述
          productCode: 'QUICK_MSECURITY_PAY', // 销售产品码，固定值
          timeoutExpress: '30m', // 订单超时时间
        },
      }
    );

    // result 就是 orderInfo，前端直接使用它调起支付宝SDK
    console.log('支付宝订单创建成功，outTradeNo:', outTradeNo);
    return result;
  } catch (error) {
    console.error('创建支付宝订单失败:', error);
    throw new Error('支付宝订单创建失败');
  }
}

/**
 * 创建微信支付订单
 * 使用微信APP支付统一下单接口
 * 返回前端所需的支付参数
 */
async function createWechatPayOrder({ outTradeNo, orderIds, totalPrice, userId }) {
  try {
    // 微信支付配置
    const wechatConfig = config.wechat || {};
    const appId = wechatConfig.appId || 'your_wechat_app_id'; // 微信开放平台审核通过的应用APPID
    const mchId = wechatConfig.mchId || 'your_mch_id'; // 微信支付商户号
    const apiKey = wechatConfig.apiKey || 'your_api_key'; // 商户平台API密钥
    const notifyUrl = wechatConfig.notifyUrl || `${config.serverOptions.host}:${config.serverOptions.port}/wechatPayNotify`; // 支付结果通知地址

    // 生成随机字符串
    const nonceStr = crypto.randomBytes(16).toString('hex');

    // 生成时间戳（秒级）
    const timeStamp = Math.floor(Date.now() / 1000).toString();

    // 统一下单参数
    const unifiedOrderParams = {
      appid: appId,
      mch_id: mchId,
      nonce_str: nonceStr,
      body: '商城订单支付',
      out_trade_no: outTradeNo,
      total_fee: Math.round(totalPrice * 100), // 金额转为分
      spbill_create_ip: req.ip || '127.0.0.1', // 客户端IP
      notify_url: notifyUrl,
      trade_type: 'APP', // 交易类型，APP表示APP支付
    };

    // 生成签名
    const sign = generateWechatSign(unifiedOrderParams, apiKey);
    unifiedOrderParams.sign = sign;

    // 调用微信统一下单接口
    // 接口文档：https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1
    const xmlData = buildXmlFromObject(unifiedOrderParams);
    const response = await fetch('https://api.mch.weixin.qq.com/pay/unifiedorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/xml' },
      body: xmlData,
    });

    const responseText = await response.text();
    const responseData = parseXmlToObject(responseText);

    // 检查统一下单结果
    if (responseData.return_code !== 'SUCCESS' || responseData.result_code !== 'SUCCESS') {
      throw new Error(`微信统一下单失败：${responseData.return_msg || responseData.err_code_des}`);
    }

    const prepayId = responseData.prepay_id;

    // 生成APP调起支付所需的参数
    const payParams = {
      appId,
      partnerId: mchId,
      prepayId,
      packageValue: 'Sign=WXPay', // 固定值
      nonceStr: crypto.randomBytes(16).toString('hex'),
      timeStamp: Math.floor(Date.now() / 1000).toString(),
    };

    // 生成支付签名
    payParams.sign = generateWechatSign(
      {
        appid: payParams.appId,
        partnerid: payParams.partnerId,
        prepayid: payParams.prepayId,
        package: payParams.packageValue,
        noncestr: payParams.nonceStr,
        timestamp: payParams.timeStamp,
      },
      apiKey
    );

    console.log('微信订单创建成功，outTradeNo:', outTradeNo);

    return {
      payMethod: 'wechat',
      outTradeNo,
      ...payParams,
    };
  } catch (error) {
    console.error('创建微信订单失败:', error);
    throw new Error('微信订单创建失败');
  }
}

/**
 * 生成微信支付签名
 * @param {Object} params - 签名参数
 * @param {String} apiKey - 商户API密钥
 * @returns {String} 签名（MD5）
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
 * 将对象转换为XML格式（微信支付请求格式）
 */
function buildXmlFromObject(obj) {
  let xml = '<xml>';
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      xml += `<${key}><![CDATA[${obj[key]}]]></${key}>`;
    }
  }
  xml += '</xml>';
  return xml;
}

/**
 * 将XML转换为对象（微信支付响应格式）
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
