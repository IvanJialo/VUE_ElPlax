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
import crearClases from '../views/CrearClasesView.vue'
import crearRegistro from '../views/CrearRegistroView.vue'
import tablaDeRegistros from '../views/TablaRegistrosView.vue'
import crearPDF from '../views/CrearPDFView.vue'
import tablaClases from '../views/TablaClasesView.vue'
import importarCSV from '../views/ImportExportView.vue'

// Función para verificar autenticación
function isAuthenticated() {
  return document.cookie.includes('sessionToken='); // Verifica si existe la cookie
}

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
      meta: { requiresAuth: true }, // Ruta protegida
    },
    {
      path: '/estudiantes',
      name: 'estudiantes',
      component: tablaDeEstudiantes,
      meta: { requiresAuth: true },
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: tablaDeEmpresas,
      meta: { requiresAuth: true },
    },
    {
      path: '/editarAlumno',
      name: 'editarAlumno',
      component: editarAlumno,
      meta: { requiresAuth: true },
    },
    {
      path: '/crearClases',
      name: 'crearClases',
      component: crearClases,
      meta: { requiresAuth: true },
    },
    {
      path: '/editarEmpresa',
      name: 'editarEmpresa',
      component: editarEmpresa,
      meta: { requiresAuth: true },
    },
    {
      path: '/asignaciones',
      name: 'asignaciones',
      component: tablaAsignaciones,
      meta: { requiresAuth: true },
    },
    {
      path: '/crearAlumno',
      name: 'crearAlumno',
      component: crearAlumno,
      meta: { requiresAuth: true },
    },
    {
      path: '/clases',
      name: 'clases',
      component: tablaClases,
      meta: { requiresAuth: true },
    },
    {
      path: '/crearEmpresa',
      name: 'crearEmpresa',
      component: crearEmpresa,
      meta: { requiresAuth: true },
    },
    {
      path: '/crearAsignacion',
      name: 'crearAsignacion',
      component: crearAsignacion,
      meta: { requiresAuth: true },
    },
    {
      path: '/crearRegistro',
      name: 'crearRegistro',
      component: crearRegistro,
      meta: { requiresAuth: true },
    },
    {
      path: '/registros',
      name: 'registros',
      component: tablaDeRegistros,
      meta: { requiresAuth: true },
    },
    {
      path: '/crearPDF',
      name: 'crearPDF',
      component: crearPDF,
      meta: { requiresAuth: true },
    },
    {
      path: '/importarCSV',
      name: 'importarCSV',
      component: importarCSV,
      meta: { requiresAuth: true },
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('sessionToken='));
  const isAuthenticated = !!token;

  if (to.path !== '/' && !isAuthenticated) {
      next('/');
  } else {
      next();
  }
});

export default router;
