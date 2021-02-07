export default {
  judgeisIE: function() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var re = /(msie|firefox|chrome|opera|version|rv).*?([\d.]+)/;
    var m = ua.match(re);
    Sys.browser = m[1].replace(/version/, "'safari");
    Sys.ver = m[2];
    var userAgent = window.navigator.userAgent; //取得浏览器的userAgent字符串
    console.log(userAgent);
    var isIE = userAgent.indexOf("NET") != -1 && userAgent.indexOf("rv") != -1; //判断是否IE浏览器
    console.log(isIE);
    if (isIE) {
      /*broName = 'IE浏览器'; */
      var strStart = userAgent.indexOf("rv");
      var strStop = userAgent.indexOf(")");
      var temp = userAgent.substring(strStart, strStop);
      var broName = temp.replace("rv", "IE").replace(":", "版本号");
      var vr = temp.split(":");
      var vrmsg = vr[1]; //IE浏览器版本号
      if (Number(vrmsg) >= 10) {
        return true;
      } else {
        return false; //版本低
      }
    } else {
      return false; //非IE
    }
  }
};
