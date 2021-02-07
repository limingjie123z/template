import CryptoJS from "crypto-js";

export default {
  decrypt: function(data) {
    /* AES前端解密 */
    // console.log(data)
    // data = data
    // .replace("%23", "#")
    // .replace("%25", "%")
    // .replace("%26", "&")
    // .replace("%2B", "+")
    // .replace("%2F", "//")
    // .replace("%3F", "?");
    console.log(data);
    var key = CryptoJS.enc.Utf8.parse("4Dd2Bb3Cc1Aa5Ee0");
    var iv = CryptoJS.enc.Utf8.parse("4Dd2Bb3Cc1Aa5Ee0");
    var str = CryptoJS.AES.decrypt(data, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return str.toString(CryptoJS.enc.Utf8);
  }
};
