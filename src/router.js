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
    {path:'/',component:Index,meta:'文章管理',children:[
      {path:'postlist',component:PostList,meta:'文章列表'},
      {path:'postadd',component:PostAdd,meta:'发布文章'},
    ]},

  ]
})
