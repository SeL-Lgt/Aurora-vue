import mHome from '@/views/pages/Home/mHome'

export default {
  path: '/home',
  name: 'home',
  meta: {
    title: '首页',
    requireAuth: true
  },
  component: mHome
}
