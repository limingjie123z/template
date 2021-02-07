// import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);
export default {
  install(Vue) {
    Vue.prototype.open1 = function(a) {
      //全局函数1
      this.$message(a);
    };
    Vue.prototype.open2 = function(a) {
      //全局函数1
      this.$message({
        message: a,
        type: "success"
      });
    };
    Vue.prototype.open3 = function(a) {
      //全局函数1
      this.$message({
        message: a,
        type: "warning"
      });
    };
    Vue.prototype.open4 = function(a) {
      //全局函数1
      this.$message.error(a);
    };
	
	Vue.prototype.getCookie = function(cookieName) {
	  const strCookie = document.cookie
	  const cookieList = strCookie.split(';')
	  
	  for(let i = 0; i < cookieList.length; i++) {
	    const arr = cookieList[i].split('=')
	    if (cookieName === arr[0].trim()) {
	      return arr[1]
	    }
	  }
	  
	  return ''
	};

    Vue.prototype.imgba = function(a, b, c) {
      //全局函数1
      var src = a; //imgurl 就是你的图片路径
      function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataURL = canvas.toDataURL("image/png"); // 可选其他值 image/jpeg
        return dataURL;
      }

      function main(src, imgurl) {
        var image = new Image();
        image.src = src;
        image.crossOrigin = "*"; // 支持跨域图片
        image.onload = function() {
          var base64 = getBase64Image(image);
          imgurl(base64, c);
        };
      }

      main(src, b, c);
    };
  }
};
