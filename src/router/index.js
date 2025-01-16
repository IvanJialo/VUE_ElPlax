import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import ejemplo from '../components/EstudiantesYProfesoresList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/ejemplo',
      name: 'ejemplo',
      component: ejemplo,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: AboutView,
    // },
  ],
})

export default router
