import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AreaPrivada from '../components/AreaPrivada.vue'
import administracion from '../components/administracion.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/privada',
      component: AreaPrivada
    },
    {
      path:'/admin',
      component:administracion
    }
  ]
})

export default router
