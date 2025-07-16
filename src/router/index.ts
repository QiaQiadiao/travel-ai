import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
  { path: '/ad', name:'ad', component: () => import('@/pages/ads/AdPage.vue') },
  { path:'/compliant', name:'compliant', component: () => import('@/pages/CompliantPage.vue')}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router