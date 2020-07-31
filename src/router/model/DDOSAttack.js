import tempVue from "@/views/pages/index" //中间组件
import ddosAttack from "@/views/pages/DDOSAttack/ddosAttack";

export default {
  path: "/ddos",
  name: 'ddos',
  redirect: '/ddos/ddosAttack',
  component: tempVue,
  children: [{
    path: 'ddosAttack',
    name: 'ddosAttack',
    meta: {
      title: "ddos防护攻击",
      requireAuth: true
    },
    component: ddosAttack
  }]
}
