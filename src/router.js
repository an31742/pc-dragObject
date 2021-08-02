import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PCDrag',
      component: () => import('./views/PcDrag')
    },
    {
      path: '/pic',
      name: 'Pic',
      component: () => import('./views/PcDrag/pic')
    }
  ]
})
