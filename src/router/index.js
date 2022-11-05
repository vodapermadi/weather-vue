import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityViews from '../views/CityViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/weather/:state/:city',
      // path: '/weather',
      name: 'cityView',
      component: CityViews
    },
  ]
})

export default router
