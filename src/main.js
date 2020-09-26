// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import axios from 'axios'


Vue.config.productionTip = false;
// 要是想在别的组件中也使用 axios 要讲 axios 改写为原型属性

import router from './router/router'
Vue.prototype.$axios =  axios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  router
});
