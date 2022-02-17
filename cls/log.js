require('dotenv').config()
const crypto = require('crypto')
const fetch = require('node-fetch')

const secretId = process.env.SECRET_ID
const secretKey = process.env.SECRET_KEY
const topic_id = process.env.TOPIC_ID
const host = process.env.HOST
const method = "POST"
const path="/structuredlog"
const params = { topic_id }
const expire = 300

const url = `https://${host}${path}?topic_id=${topic_id}`

module.exports = {
  sentLogToTencentCloud: async protobuf => {
    const md5 = crypto.createHash('md5').update(protobuf).digest("hex");
    var headers = {
      "Host": host,
      "Content-Type": "application/x-protobuf",
      'User-Agent': 'AuthSDK',
      'Content-MD5': md5,
      "Connection": "Keep-Alive",
      "Keep-Alive": "timeout=10, max=100000000"
    }
    const auth = signature(secretId, secretKey, method, path, params, headers, expire)
    headers = {
      ...headers,
      Authorization: auth,
    }
    fetch(url, {
      method: 'post',
      body: protobuf,
      headers,
    })
    .then(response => {
        if (response.status >= 400) throw new Error("sent to cloud failed!")
    })
  }
}

function signature (secretId, secretpath, method, path, params, headers, expire) {
  method = method.toLowerCase();
  var camSafeUrlEncode = function (str) {
      return encodeURIComponent(str)
          .replace(/!/g, '%21')
          .replace(/'/g, '%27')
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29')
          .replace(/\*/g, '%2A');
  }

  var getParamKeylist = function (obj) {
      var list = [];
      for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
              list.push(key);
          }
      }
      return list.sort(function (a, b) {
          a = a.toLowerCase();
          b = b.toLowerCase();
          return a === b ? 0 : (a > b ? 1 : -1);
      });
  };

  var getHeaderKeylist = function (obj) {
      var list = [];
      for (var key in obj) {
          var lowerKey = key.toLowerCase();
          if (obj.hasOwnProperty(key) &&
              (lowerKey === "content-type" || lowerKey === "content-md5"
                  || lowerKey === "host" || lowerKey[0] === 'x')) {
              list.push(key);
          }
      }
      return list.sort(function (a, b) {
          a = a.toLowerCase();
          b = b.toLowerCase();
          return a === b ? 0 : (a > b ? 1 : -1);
      });
  };

  var map2str = function (obj, getKeylist) {
      var i, key, val;
      var list = [];
      var keyList = getKeylist(obj);
      for (i = 0; i < keyList.length; i++) {
          key = keyList[i];
          val = (obj[key] === undefined || obj[key] === null) ? '' : ('' + obj[key]);
          key = key.toLowerCase();
          key = camSafeUrlEncode(key);
          val = camSafeUrlEncode(val) || '';
          list.push(key + '=' + val)
      }
      return list.join('&');
  };

  // 签名有效起止时间
  var now = Math.floor(Date.now()/1000);
  var exp = now + expire;
  now = now - 60;

  // 要用到的 Authorization 参数列表
  var qSignAlgorithm = 'sha1';
  var qAk = secretId;
  var qSignTime = now + ';' + exp;
  //qSignTime = "1510109254;1510109314";
  var qpathTime = qSignTime;
  var qHeaderList = getHeaderKeylist(headers).join(';').toLowerCase();
  var qUrlParamList = getParamKeylist(params).join(';').toLowerCase();

  // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
  // 步骤一：计算 Signpath
  var signpath = crypto.createHmac('sha1', secretpath).update(qpathTime).digest('hex');

  // 步骤二：构成 FormatString
  var formatString = [method, path, map2str(params, getParamKeylist), map2str(headers, getHeaderKeylist), ''].join('\n');
  //formatString = Buffer.from(formatString, 'utf8');

  // 步骤三：计算 StringToSign
  var res = crypto.createHash('sha1').update(formatString).digest('hex');
  var stringToSign = ['sha1', qSignTime, res, ''].join('\n');

  // 步骤四：计算 Signature
  var qSignature = crypto.createHmac('sha1', signpath).update(stringToSign).digest('hex');

  // 步骤五：构造 Authorization
  var authorization = [
      'q-sign-algorithm=' + qSignAlgorithm,
      'q-ak=' + qAk,
      'q-sign-time=' + qSignTime,
      'q-key-time=' + qpathTime,
      'q-header-list=' + qHeaderList,
      'q-url-param-list=' + qUrlParamList,
      'q-signature=' + qSignature
  ].join('&');
  return authorization;
}