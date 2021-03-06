import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import login from '@/components/login'
import adminmanage from '@/components/adminmanage'
import editblog from '@/components/editblog'
import myblogpage from '@/components/myblogpage'
import showspecific from '@/components/showspecific'
import Mypage from '@/components/myintropage'

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
    },
    {
      path: '/myblog',
      name: 'myblog',
      component: myblogpage
    },
    {
      path: '/spcific',
      name: 'spcific',
      component: showspecific
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: Mypage
    }
  ]
})
