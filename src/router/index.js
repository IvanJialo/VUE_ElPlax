import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import HomeView from '@/views/HomeView.vue'
import tablaDeEstudiantes from '../views/TablaAlumnosView.vue'
import tablaDeEmpresas from '../views/TablaEmpresasView.vue'
import editarAlumno from '../views/EditarAlumnoView.vue'
import editarEmpresa from '../views/EditarEmpresaView.vue'
import tablaAsignaciones from '../views/TablaAsignacionesView.vue'
import crearAlumno from '../views/CrearAlumnoView.vue'
import crearEmpresa from '../views/CrearEmpresaView.vue'
import crearAsignacion from '../views/CrearAsignacionView.vue'


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
    {
      path: '/estudiantes',
      name: 'estudiantes',
      component: tablaDeEstudiantes,
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: tablaDeEmpresas,
    },
    {
      path: '/editarAlumno',
      name: 'editarAlumno',
      component: editarAlumno,
    },
    {
      path: '/editarEmpresa',
      name: 'editarEmpresa',
      component: editarEmpresa,
    },
    {
      path: '/asignaciones',
      name: 'asignaciones',
      component: tablaAsignaciones,
    },
    {
      path: '/crearAlumno',
      name: 'crearAlumno',
      component: crearAlumno,
    },
    {
      path: '/crearEmpresa',
      name: 'crearEmpresa',
      component: crearEmpresa,
    },
    {
      path: '/crearAsignacion',
      name: 'crearAsignacion',
      component: crearAsignacion,
    },
  ],
})

export default router
