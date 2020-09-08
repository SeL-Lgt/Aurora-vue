import tempVue from "@/views/pages/index"; //中间组件
import interfaceStatusInformation from "@/views/pages/Interface/interfaceInformation";
import topology from "@/views/pages/Interface/topology";

export default {
  path: '/interfaceStatus',
  name: 'interfaceStatus',
  redirect: '/interfaceStatus/topology',
  component: tempVue,
  children: [
    {
      path: 'interfaceStatusInformation',
      name: 'interfaceStatusInformation',
      meta: {
        title: '接口状态',
        requireAuth: true
      },
      component: interfaceStatusInformation
    },
    {
      path: 'topology',
      name: 'topology',
      meta: {
        title: '拓扑图',
        requireAuth: true
      },
      component: topology
    }]
}
