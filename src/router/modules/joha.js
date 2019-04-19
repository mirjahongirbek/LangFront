import Layout from '@/views/layout/Layout'

const lang = {
  path: '/lang',
  component: Layout,
  name: 'Joha',
  meta: {
    title: 'joha Langs',
    icon: 'chart'
  },
  children: [
    {
      component: () => import('@/views/joha/projects'),
      path: ''
    }, {
      component: () => import('@/views/joha/entity.vue'),
      path: 'entity/:id/:name'
    },
    {
      component: () => import('@/views/language/list.vue'),
      path: 'getAll'
    }
  ]

}
export default lang
