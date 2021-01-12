Vue.config.productionTip = false;

// 第三方UI组件
import Vue from "vue";
import ElementUI from "element-ui";

Vue.use(ElementUI);

// 通用UI模块
import JX3BOX_UI from '@jx3box/jx3box-common-ui'
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";

Vue.use(JX3BOX_UI);

Vue.prototype.$_ = require("lodash");

// 数据与路由
import router from "./router";
import store from "./store";
import App from "./App.vue";

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");

// 注册全局过滤器
import * as filters from "./filters";

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});

let arr = [5, 4, 6, 2, 8, 9, 7, 1, 3, 0];
let count = 0;
/*for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
        count++;
        if (arr[i] > arr[j]) {
            let tmp = arr[j];
            arr[j] = arr[i];
            arr[i] = tmp;
        }
    }
}*/

for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
        count++;
        if (arr[j] > arr[j + 1]) {
            let tmp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = tmp;
        }
    }
}

console.log(arr, count);


