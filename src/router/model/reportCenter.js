import tempVue from '@/views/pages/index'
import financialStatements from '@/views/pages/ReportCenter/financialStatements'
import salesReport from "@/views/pages/ReportCenter/salesReport";

export default {
  path: '/reportCenter',
  name: 'reportCenter',
  component: tempVue,
  children: [{
    path: 'financialStatements',
    name: 'financialStatements',
    meta: {
      title: '财务报表'
    },
    component: financialStatements
  }, {
    path: 'salesReport',
    name:'salesReport',
    meta: {
      title: '销售报表'
    },
    component:salesReport
  }]
}
