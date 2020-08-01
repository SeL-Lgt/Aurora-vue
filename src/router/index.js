import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)
import home from './model/home'
import interfaceStatus from "./model/interfaceStatus";
import configuration from "./model/configuration";
import DDOSAttack from "./model/DDOSAttack";
import cpuInformation from "./model/cpuInformation";

/**
 * 重写路由的push方法
 * 但会隐藏路由的错误信息
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: '首页',
        requireAuth: true
      },
      component: () => import('@/views/common/home'),
      redirect: '/login',
      children: [
        home,
        interfaceStatus,
        configuration,
        DDOSAttack,
        cpuInformation
      ]
    }, {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        requireAuth: false
      },
      component: () => import('@/views/common/login')
    }
  ],
  mode: 'hash'
});
