/**
 * 工具类
 */
import CryptoJS from 'crypto-js'
import md5 from 'js-md5'

export const utils = {
  // 加密
  encrypt (word, keyStr) {
    keyStr = keyStr ? keyStr : Date.parse(new Date());
    let key = CryptoJS.enc.Utf8.parse(keyStr); // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  },
  // 解密
  decrypt (word, keyStr) {
    keyStr = keyStr ? keyStr : Date.parse(new Date());
    let key = CryptoJS.enc.Utf8.parse(keyStr); // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    let decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
  // UUID
  uuid (len, radix) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [];
    let i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      // rfc4122, version 4 form
      let r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '';
      uuid[14] = '4';

      // Fill in random data. At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  },
  // MD5加密
  MD5 (arg) {
    return md5(arg)
  },
  // 16位随机数
  random16 () {
    let num = '';
    for (let i = 0; i < 16; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  },
  // 验证手机号
  isPhoneNum (number) {
    let phoneReg = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[0123456789]|17[0123456789])[0-9]{8}$/;
    return phoneReg.test(number);
  },
  // 验证身份证
  isCardNumber (number) {
    let cardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])|([1−9]\d5\d2((0[1−9])|(10|11|12))(([0−2][1−9])|10|20|30|31)\d2[0−9Xx])$/;
    return cardReg.test(number);
  },
  // 获取url参数
  getUrlParams (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);

    return (r != null) ? decodeURI(r[2]) : null;
  },
  // 数组切割
  cutArray (data, cutNum) {
    if (data && cutNum > 0) {
      let arrayItem = []
      let array = []
      let num = cutNum
      data.map((item, index) => {
        if (num > 0) {
          arrayItem.push(item)
          if (index === (data.length - 1)) {
            array.push(arrayItem)
          }
        } else {
          num = cutNum
          array.push(arrayItem)
          arrayItem = []
          arrayItem.push(item)
          if (index === (data.length - 1)) {
            array.push(arrayItem)
          }
        }
        num--
      })
      return array
    }
  },
  adapterPosition (selector) {
    if (/iphone/i.test(navigator.userAgent)) return
    const h = window.innerHeight;
    const dom = document.querySelector(selector)
    if (!dom) return
    const display = dom.style.display
    window.addEventListener('resize', () => {
      const height = window.innerHeight
      if (height < h) {
        dom.style.display = 'none'
      } else {
        dom.style.display = display
      }
    });
  }
}
