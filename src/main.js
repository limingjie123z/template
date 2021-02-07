import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./utils/rem";
import AesEncrypt from "./utils/aesEncrypt";
import AesDecrypt from "./utils/aesDecrypt.js";
import Viewer from "v-viewer";
import isIE from "./utils/isIE.js";
import "viewerjs/dist/viewer.css";
Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    title: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    keyboard: true,
    url: "data-source"
  }
});	
Vue.config.devtools = true;
Vue.component("vue-ueditor-wrap", VueUeditorWrap);
import base from "./utils/base.js"; //引用
Vue.use(base);
Vue.prototype.$aesEncrypt = AesEncrypt;
Vue.prototype.$aesDecrypt = AesDecrypt;
Vue.prototype.$isIE = isIE;
Vue.config.productionTip = false;
// Vue.http.headers.common["authentication"] = Vue.$cookies.get("Authentication");
// console.log(Vue.http.interceptors)

// Vue.use(VueResource)
// Vue.http.options.xhr = { withCredentials: true };
// Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request, next) => {

    request.credentials = true;
    // console.log(request)
		function getCookie(cookieName) {
			  const strCookie = document.cookie
			  const cookieList = strCookie.split(';')
			  
			  for(let i = 0; i < cookieList.length; i++) {
			    const arr = cookieList[i].split('=')
			    if (cookieName === arr[0].trim()) {
			      return arr[1]
			    }
			  }
			  
			  return ''
			}
		// console.log(getCookie('Authentication'))
    request.headers.set('Authentication', getCookie('Authentication'));
    next();

});

// 兼容ie页面显示
function checkIE() {
  return (
    "-ms-scroll-limit" in document.documentElement.style &&
    "-ms-ime-align" in document.documentElement.style
  );
}
if (checkIE()) {
  window.addEventListener(
    "hashchange",
    () => {
      var currentPath = window.location.hash.slice(1);
      if (this.$route.path !== currentPath) {
        this.$router.push(currentPath);
      }
    },
    false
  );
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
