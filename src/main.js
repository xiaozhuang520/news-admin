import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.prototype.$axios=axios
axios.defaults.baseURL="http://localhost:3000"
Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  const token=JSON.parse(localStorage.getItem('user') || `{}`).token;
  if(to.path !=='/login'){
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
