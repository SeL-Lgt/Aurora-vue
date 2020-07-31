import tempVue from "@/views/pages/index"; //中间组件
import interfaceStatusInformation from "@/views/pages/Interface/interfaceInformation";

export default {
  path: '/interfaceStatus',
  name: 'interfaceStatus',
  redirect: '/interfaceStatus/interfaceStatusInformation',
  component: tempVue,
  children: [{
    path: 'interfaceStatusInformation',
    name: 'interfaceStatusInformation',
    meta: {
      title: '接口状态',
      requireAuth: true
    },
    component: interfaceStatusInformation
  }]
}
