import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/main.scss';

import echarts from 'echarts';
import api from './api/api'

Vue.config.productionTip = false

Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI);


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem('username')) {
      document.title = `${to.meta.title}`;
      next();
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next();
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
