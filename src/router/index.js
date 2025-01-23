import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import ejemplo from '../components/EstudiantesYProfesoresList.vue'
import HomeView from '@/views/HomeView.vue'
// import tablaDeEstudiantes from '../views/TablaAlumnosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/estudiantes',
    //   name: 'estudiantes',
    //   component: tablaDeEstudiantes,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: AboutView,
    // },
  ],
})

export default router
