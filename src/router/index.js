import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import ejemplo from '../components/EstudiantesYProfesoresList.vue'
import tablaDeEstudiantes from '../views/TablaAlumnosView.vue'

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
    {
      path: '/estudiantes',
      name: 'estudiantes',
      component: tablaDeEstudiantes,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: AboutView,
    // },
  ],
})

export default router
