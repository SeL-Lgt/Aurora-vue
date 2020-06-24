import tempVue from "@/views/pages/index"
import orderSummary from "@/views/pages/ProcurementManagement/orderSummary"
import purchasePayment from "@/views/pages/ProcurementManagement/purchasePayment"
import purchaseProgress from "@/views/pages/ProcurementManagement/purchaseProgress"
import purchasingSummary from "@/views/pages/ProcurementManagement/purchasingSummary"
import quotationManagement from "@/views/pages/ProcurementManagement/quotationManagement"

export default {
  path: '/procurementManagement',
  name: 'procurementManagement',
  component: tempVue,
  children: [{
    path: 'orderSummary',
    name: 'orderSummary',
    meta: {
      title: '订单汇总'
    },
    component: orderSummary
  },{
    path: 'purchasePayment',
    name: 'purchasePayment',
    meta: {
      title: '采购付款'
    },
    component: purchasePayment
  },{
    path: 'purchaseProgress',
    name: 'purchaseProgress',
    meta: {
      title: '采购进度'
    },
    component: purchaseProgress
  },{
    path: 'purchasingSummary',
    name: 'purchasingSummary',
    meta: {
      title: '采购汇总'
    },
    component: purchasingSummary
  },{
    path: 'quotationManagement',
    name: 'quotationManagement',
    meta: {
      title: '报价管理'
    },
    component: quotationManagement
  }]
}
