<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import ExportData from '../components/ExportData.vue';
import { logout } from '@/composables/login';
import { exportCSV } from "@/composables/useDatabase";
import Swal from 'sweetalert2';


const exportarCSV = () => {
  exportCSV(); // Llama a la función para exportar datos
};

const router = useRouter();

const isMenuOpen = ref(false);

const handleLogout = () => {
  logout();
  router.push('/');
  toggleMenu();
};

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;

  if (isMenuOpen.value) {
    document.getElementById('general-menu').classList.add('bg-[#DCD0FF]/40');
  } else {
    document.getElementById('general-menu').classList.remove('bg-[#DCD0FF]/40');
    setTimeout(() => {
      document.getElementById('desplegable').classList.add('hidden');
    }, 300);
  }
}

function exportarPDF() {
  router.push('/crearPDF');
  toggleMenu();
}

function estudiantes() {
  router.push('/estudiantes');
  toggleMenu();
}
function empresas() {
  router.push('/empresas');
  toggleMenu();
}
function clases() {
  router.push('/clases');
  toggleMenu();
}
function asignaciones() {
  router.push('/asignaciones');
  toggleMenu();
}
function profesores() {
  router.push('/profesores');
  toggleMenu();
}
function crearEstudiantes() {
  router.push('/crearAlumno');
  toggleMenu();
}
function crearEmpresas() {
  router.push('/crearEmpresa');
  toggleMenu();
}
function crearProfesores() {
  router.push('/crearProfesor');
  toggleMenu();
}

function crearClases() {
  router.push('/crearClases');
  toggleMenu();
}
function crearAsignaciones() {
  router.push('/crearAsignacion');
  toggleMenu();
}
function CrearRegistros() {
  Swal.fire({
    title: 'Atención',
    html: `
      <p>Para crear un registro respecto a una empresa, tiene que seleccionar este botón:</p>
      <button class="p-2 text-green-600 hover:bg-red-50 rounded-lg transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4v16a2 2 0 002 2h10a2 2 0 002-2V4m-2 0a2 2 0 00-2-2H7a2 2 0 00-2 2m3 4h8m-8 4h8m-8 4h5"/>
        </svg>
      </button>
    `,
    confirmButtonText: 'Aceptar'
  }).then(() => {
    router.push('/empresas');
    toggleMenu();
  });
}
function registros() {
  router.push('/registros');
  toggleMenu();
}
</script>

<template>
  <aside>
    <div class="flex">
      <div class="flex h-screen w-16 flex-col justify-between border-e bg-white">
        <div>
          <div class="inline-flex size-16 items-center justify-center">
            <span class="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              L
            </span>
          </div>

          <div class="border-t border-gray-100">
            <div class="px-2">
              <div class="py-4" @click="toggleMenu">
                <a href="#" id="general-menu"
                  class="t group relative flex justify-center rounded px-2 py-1.5 text-[#b197ff]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#b197ff" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
                  </svg>

                  <span
                    class="text-nowrap invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    General
                  </span>
                </a>
              </div>

              <ul class="space-y-1 border-t border-gray-100 pt-4">
                <li>
                  <RouterLink to="/home"
                    class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#b197ff"
                        d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13m7 7v-5h4v5zm2-15.586l6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586z" />
                    </svg>

                    <span
                      class="text-nowrap invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Home
                    </span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/crearAlumno"
                    class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <g fill="none" stroke="#b197ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        color="#b197ff">
                        <path d="M2.5 6L8 4l5.5 2L11 7.5V9s-.667-.5-3-.5S5 9 5 9V7.5zm0 0v4" />
                        <path
                          d="M11 8.5v.889c0 1.718-1.343 3.111-3 3.111s-3-1.393-3-3.111V8.5m10.318 2.53s.485-.353 2.182-.353s2.182.352 2.182.352m-4.364 0V10L13.5 9l4-1.5l4 1.5l-1.818 1v1.03m-4.364 0v.288a2.182 2.182 0 1 0 4.364 0v-.289M4.385 15.926c-.943.527-3.416 1.602-1.91 2.947C3.211 19.53 4.03 20 5.061 20h5.878c1.03 0 1.85-.47 2.586-1.127c1.506-1.345-.967-2.42-1.91-2.947c-2.212-1.235-5.018-1.235-7.23 0M16 20h3.705c.773 0 1.387-.376 1.939-.902c1.13-1.076-.725-1.936-1.432-2.357A5.34 5.34 0 0 0 16 16.214" />
                      </g>
                    </svg>

                    <span
                      class="text-nowrap invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Crear Estudiante
                    </span>
                  </RouterLink>
                </li>

                <li>
                  <RouterLink to="/crearEmpresa"
                    class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                      <path fill="#b197ff" d="M8 8h2v4H8zm0 6h2v4H8zm6-6h2v4h-2zm0 6h2v4h-2zm-6 6h2v4H8zm6 0h2v4h-2z" />
                      <path fill="#b197ff"
                        d="M30 14a2 2 0 0 0-2-2h-6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v26h28ZM4 4h16v24H4Zm18 24V14h6v14Z" />
                    </svg>

                    <span
                      class="text-nowrap invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Crear Empresa
                    </span>
                  </RouterLink>
                </li>

                <li>
                  <RouterLink to="/crearAsignacion"
                    class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                      <path fill="#b197ff"
                        d="M25 10H7a3.003 3.003 0 0 0-3 3v6a2 2 0 0 0 2 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V16h-2v12H8v-9H6v-6a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v6h-2v9h-4V16h-2v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7a2 2 0 0 0 2-2v-6a3.003 3.003 0 0 0-3-3M10 9a4 4 0 1 1 4-4a4.004 4.004 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2m12 6a4 4 0 1 1 4-4a4.004 4.004 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2" />
                    </svg>

                    <span
                      class="text-nowrap invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Asignación
                    </span>
                  </RouterLink>
                </li>
                <li>
                  <a href="#"
                    class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <ExportData />
                    <span
                      class="text-nowrap invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Exportar
                    </span>
                  </a>
                </li>
                <li>
                  <RouterLink to="/importarCSV"
                    class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#b197ff"
                        d="m8.84 12l-4.92 4.92L2.5 15.5L5 13H0v-2h5L2.5 8.5l1.42-1.42zM12 3C8.59 3 5.68 4.07 4.53 5.57L5 6l1.03 1.07C6 7.05 6 7 6 7c0-.5 2.13-2 6-2s6 1.5 6 2s-2.13 2-6 2c-2.62 0-4.42-.69-5.32-1.28l3.12 3.12c.7.1 1.44.16 2.2.16c2.39 0 4.53-.53 6-1.36v2.81c-1.3.95-3.58 1.55-6 1.55c-.96 0-1.9-.1-2.76-.27l-1.65 1.64c1.32.4 2.82.63 4.41.63c2.28 0 4.39-.45 6-1.23V17c0 .5-2.13 2-6 2s-6-1.5-6-2v-.04L5 18l-.46.43C5.69 19.93 8.6 21 12 21c4.41 0 8-1.79 8-4V7c0-2.21-3.58-4-8-4" />
                    </svg>
                    <span
                      class="text-nowrap invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Importar CSV
                    </span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2 ">
          <form action="#">
            <button type="submit" @click.prevent="handleLogout"
              class="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-[#b197ff] hover:bg-[#D] hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>

              <span
                class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                Logout
              </span>
            </button>
          </form>
          <span class="-mb-2 -ml-1  block text-wrap text-xs text-gray-400">v0.1.1</span>
        </div>
      </div>

      <div id="desplegable" class="flex h-screen flex-1 flex-col justify-between border-e bg-white"
        :class="isMenuOpen ? 'opacity-100 animate-fade-in-right sm:max-w-[20vw] max-w-[100vw]' : 'opacity-0 hidden'">
        <div class="px-4 py-6">
          <ul class="mt-14 space-y-1">
            <li>
              <a href="#" class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                General
              </a>
            </li>

            <li>
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span class="text-sm font-medium"> Estudiantes </span>

                  <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                </summary>

                <ul class="mt-2 space-y-1 px-4">
                  <li>
                    <button @click.prevent="crearEstudiantes"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Crear Estudiante
                    </button>
                  </li>

                  <li>
                    <button @click.prevent="estudiantes"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Información
                    </button>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span class="text-sm font-medium"> Empresas </span>

                  <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                </summary>

                <ul class="mt-2 space-y-1 px-4">
                  <li>
                    <button @click.prevent="crearEmpresas"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Crear Empresas
                    </button>
                  </li>

                  <li>
                    <button @click.prevent="empresas"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Información
                    </button>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span class="text-sm font-medium"> Profesores </span>

                  <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                </summary>

                <ul class="mt-2 space-y-1 px-4">
                  <li>
                    <button @click.prevent="crearProfesores"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Crear Profesores
                    </button>
                  </li>

                  <li>
                    <button @click.prevent="profesores"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Información
                    </button>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span class="text-sm font-medium"> Clases </span>

                  <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                </summary>

                <ul class="mt-2 space-y-1 px-4">
                  <li>
                    <button @click.prevent="crearClases"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Crear Clases
                    </button>
                  </li>

                  <li>
                    <button @click.prevent="clases"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Información
                    </button>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span class="text-sm font-medium"> Asignaciones </span>

                  <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                </summary>

                <ul class="mt-2 space-y-1 px-4">
                  <li>
                    <button @click.prevent="crearAsignaciones"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Crear Asignaciones
                    </button>
                  </li>

                  <li>
                    <button @click.prevent="asignaciones"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Información
                    </button>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span class="text-sm font-medium"> Registros </span>

                  <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                </summary>

                <ul class="mt-2 space-y-1 px-4">
                  <li>
                    <button @click.prevent="CrearRegistros"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Crear Registros
                    </button>
                  </li>

                  <li>
                    <button @click.prevent="registros"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Información
                    </button>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span class="text-sm font-medium"> Exportar </span>

                  <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                </summary>

                <ul class="mt-2 space-y-1 px-4">
                  <li>
                    <button @click.prevent="exportarCSV" @click="toggleMenu"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Estudiantes y Empresas en CSV
                    </button>
                  </li>

                  <li>
                    <button @click.prevent="exportarPDF"
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      Registros en PDF
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>
