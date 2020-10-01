import tempVue from "@/views/pages/index"; //中间组件
import cpuInformation from "@/views/pages/CpuInformation/cpuInformation";

export default {
  path: '/cpu',
  name: 'cpu',
  redirect: '/cpu/cpuInformation',
  component: tempVue,
  children: [{
    path: 'cpuInformation',
    name: 'cpuInformation',
    meta: {
      title: '设备健康度',
      requireAuth: true
    },
    component: cpuInformation
  }]
}
