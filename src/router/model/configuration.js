import tempVue from "@/views/pages/index"; //中间组件
import configurationTemplate from "@/views/pages/Configuration/configurationTemplate";

export default {
  path: '/configuration',
  name: 'configuration',
  redirect: '/configuration/configurationTemplate',
  component: tempVue,
  children: [{
    path: 'configurationTemplate',
    name: 'configurationTemplate',
    meta: {
      title: '配制模板',
      requireAuth: true
    },
    component: configurationTemplate
  }]
}
