import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/views/Goods.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/good'
    },
    {
      path: '/good',
      name: 'Goods',
      component: Goods
    }
  ]
})
