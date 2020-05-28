import axios from 'axios'
import { JSEncrypt } from 'jsencrypt'
import { utils } from './utils'
const RSA = require('./RSA.json')

const request = (method, url, data, config = {}) => {
  let options = Object.assign({}, config, {
    url,
    method,
    baseURL: process.env.HTTP_API // 生产环境注释掉
  });

  let timestamp = utils.uuid();
  let secret = '09CB25AB7BD4708B5FDFD0C5BA981234';
  let title = utils.MD5(timestamp + secret);
  let aesKey = utils.random16(); // 生成16位随机数
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(RSA.RSA);

  let init = encrypt.encrypt(aesKey);
  let base = utils.encrypt(JSON.stringify(data), aesKey);

  options.data = options.data || {};

  if (method === 'post') {
    let env = process.env.NODE_ENV === 'production';

    if (!config.white && env) {
      options.data.timestamp = timestamp;
      options.data.title = title;
      options.data.init = init;
      options.data.base = base;
    } else {
      options.data = data;
    }
  }

  options.headers = options.headers || {};
  return new Promise((resolve, reject) => {
    axios.request(options)
      .then(res => {
        let data = res.data;
        if (!data) {
          return resolve(data);
        }
        if (method === 'post' && !data.status) {
          data = JSON.parse(utils.decrypt(data, aesKey));
        }

        if (data.HasError) {
          reject(res);
        }
        resolve(data);
      }).catch(res => {
        reject(res);
      });
  });
};

export const ajax = {
  request: request,
  get (url, config) {
    return request('get', url, null, config);
  },
  delete (url, config) {
    return request('delete', url, null, config);
  },
  head (url, config) {
    return request('head', url, null, config);
  },
  post (url, data, config) {
    return request('post', url, data, config);
  },
  put (url, data, config) {
    return request('put', url, data, config);
  },
  patch (url, data, config) {
    return request('path', url, data, config);
  },
  setCommonHeader (key, value) {
    window.axios.defaults.headers.common[key] = value;
  }
};
