import { Loading } from "element-ui";
const loadOption = {
  fullscreen: true,
  lock: true,
  text: "正在加载中",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.5)"
};
let loadingInstance;
export default class loadEvents {
  constructor(vueThis) {
    this.vm = vueThis; //vue中的this  也可以不用
  }
  open() {
    loadingInstance = Loading.service(loadOption);
  }
  close() {
    loadingInstance.close();
  }
}
