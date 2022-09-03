import { createRouter, createWebHistory } from 'vue-router'
import QuizView from '../views/QuizView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'quiz',
      component: QuizView
    },    
    {
      path: '/host',
      name: 'host',
      component: () => import('../views/HostView.vue')
    },    
    {
      path: '/packs',
      name: 'packs',
      component: () => import('../views/PacksView.vue')
    }
  ]
})

export default router
