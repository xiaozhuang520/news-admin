import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login.vue'
import Index from '@/views/index/Index.vue'
import PostList from '@/views/postlist/PostList.vue'
import PostAdd from '@/views/postadd/PostAdd.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/login',component:Login},
    {path:'/',component:Index,children:[
      {path:'postlist',component:PostList},
      {path:'postadd',component:PostAdd},
    ]},

  ]
})
