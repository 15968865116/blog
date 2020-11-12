import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import login from '@/components/login'
import adminmanage from '@/components/adminmanage'
import editblog from '@/components/editblog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: index
    },
    {
      path: '/helloworld',
      name: 'Helloworld',
      component: HelloWorld
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: login
    },
    {
      path: '/adminmanage',
      name: 'adminmanage',
      component: adminmanage
    },
    {
      path: '/editblog',
      name: 'editblog',
      component: editblog
    }
  ]
})
