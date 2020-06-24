import tempVue from "@/views/pages/index" //中间组件
import customerData from "@/views/pages/BasicInformation/customerData"
import productData from "@/views/pages/BasicInformation/productData"
import supplierData from "@/views/pages/BasicInformation/supplierData"
import purchaseData from "@/views/pages/BasicInformation/purchaseData"

export default {
  path: "/basicInformation",
  name: 'basicInformation',
  redirect: '/basicInformation/customerData',
  component: tempVue,
  children: [
    {
      path: 'customerData',
      name: 'customerData',
      meta: {
        title: "客户资料"
      },
      component: customerData
    },
    {
      path: 'productData',
      name: 'productData',
      meta: {
        title: "产品数据"
      },
      component: productData
    },
    {
      path: 'purchaseData',
      name: 'purchaseData',
      meta: {
        title: "采购数据"
      },
      component: purchaseData
    },
    {
      path: 'supplierData',
      name: 'supplierData',
      meta: {
        title: "供应商数据"
      },
      component: supplierData
    }
  ]
}
