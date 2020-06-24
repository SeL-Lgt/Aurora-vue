import tempVue from '@/views/pages/index';
import supplierBlacklist from "@/views/pages/SupplierManagement/supplierBlacklist";
import supplierEvaluation from "@/views/pages/SupplierManagement/supplierEvaluation";
import supplierList from "@/views/pages/SupplierManagement/supplierList";

export default {
  path:'/supplierManagement',
  name:'supplierManagement',
  component:tempVue,
  children:[{
    path:'supplierBlacklist',
    name:'supplierBlacklist',
    meta:{
      title:'供应商黑名单',
    },
    component: supplierBlacklist
  },{
    path:'supplierList',
    name:'supplierList',
    meta:{
      title:'供应商列表',
    },
    component: supplierList
  },{
    path:'supplierEvaluation',
    name:'supplierEvaluation',
    meta:{
      title:'供应商评估',
    },
    component: supplierEvaluation
  }]
}
