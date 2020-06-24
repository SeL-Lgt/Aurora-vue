import tempVue from "@/views/pages/index"
import payableManagement from "@/views/pages/ReconciliationManagement/payableManagement"
import receivableManagement from "@/views/pages/ReconciliationManagement/receivableManagement"

export default {
  path:'/reconciliationManagement',
  name:'reconciliationManagement',
  component:tempVue,
  children:[
    {
      path:'payableManagement',
      name:'payableManagement',
      meta:{
        title:'应付管理'
      },
      component: payableManagement
    },{
      path:'receivableManagement',
      name:'receivableManagement',
      meta:{
        title:'应收管理'
      },
      component: receivableManagement
    }
  ]
}
