import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/main.scss';

import api from './api/api'

Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
