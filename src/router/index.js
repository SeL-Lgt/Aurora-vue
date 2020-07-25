import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)
import home from './model/home'
import basicInformation from './model/basicInformation';
import interfaceStatus from "./model/interfaceStatus";
import configuration from "./model/configuration";
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
      meta: {title: '首页'},
      component: () => import('@/views/common/home'),
      redirect: '/login',
      children: [
        home,
        basicInformation,
        interfaceStatus,
        configuration
      ]
    }, {
      path: '/login',
      name: 'login',
      meta: {title: '登录'},
      component: () => import('@/views/common/login')
    }, {
      path: '/registered',
      name: 'registered',
      meta: {title: '注册'},
      component: () => import('@/views/common/registered')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  mode: 'hash'
});
