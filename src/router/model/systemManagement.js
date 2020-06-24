import tempVue from '@/views/pages/index';
import accountManagement from "@/views/pages/SystemManagement/accountManagement";
import authorityManagement from "@/views/pages/SystemManagement/authorityManagement";
import departmentManagement from "@/views/pages/SystemManagement/departmentManagement";
import jobManagement from "@/views/pages/SystemManagement/jobManagement";

export default {
  path:'/systemManagement',
  name:'systemManagement',
  component:tempVue,
  children:[{
    path:'accountManagement',
    name:'accountManagement',
    meta:{
      title:'账户管理'
    },
    component: accountManagement
  },{
    path: 'authorityManagement',
    name:'authorityManagement',
    meta:{
      title:'权限管理'
    },
    component: authorityManagement
  },{
    path: 'departmentManagement',
    name:'departmentManagement',
    meta:{
      title:'部门管理'
    },
    component: departmentManagement
  },{
    path: 'jobManagement',
    name:'jobManagement',
    meta:{
      title:'职位管理'
    },
    component: jobManagement
  }]
}
