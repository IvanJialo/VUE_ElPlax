<script setup>
import { ref, computed, onMounted } from "vue";
import { postInsertarAsignaciones } from "../composables/useDatabase";
import { getEstudiantes, getEmpresas } from "../composables/useDatabase";

const busquedaAlumno = ref("");
const busquedaEmpresa = ref("");
const fechaAsignacion = ref("");
const fechaFinalizacion = ref("");
const alumnos = ref([]);
const empresas = ref([]);
const showAlumnos = ref(false);
const showEmpresas = ref(false);
const { fetchEstudiantes } = getEstudiantes();
const { fetchEmpresas } = getEmpresas();

onMounted(async () => {
    const data = await fetchEstudiantes();
    alumnos.value = data.rows;
    const data2 = await fetchEmpresas();
    empresas.value = data2.rows;
});

const alumnosFiltrados = computed(() => {
  return alumnos.value.filter(alumno =>
    `${alumno.nombre} ${alumno.apellido}`.toLowerCase().includes(busquedaAlumno.value.toLowerCase())
  );
});

const empresasFiltradas = computed(() => {
  return empresas.value.filter(empresa =>
    empresa.nombre.toLowerCase().includes(busquedaEmpresa.value.toLowerCase())
  );
});

const asignarPracticas = async () => {
  const estudiante = alumnos.value.find(alumno => `${alumno.nombre} ${alumno.apellido}` === busquedaAlumno.value);
  const empresa = empresas.value.find(empresa => empresa.nombre === busquedaEmpresa.value);

  if (!estudiante || !empresa || !fechaAsignacion.value || !fechaFinalizacion.value) {
    alert("Todos los campos son obligatorios");
    return;
  }

  try {
    await postInsertarAsignaciones(estudiante.id_estudiante, empresa.id_empresa, fechaAsignacion.value, fechaFinalizacion.value);
    alert("Asignación agregada con éxito");
    busquedaAlumno.value = "";
    busquedaEmpresa.value = "";
    fechaAsignacion.value = "";
    fechaFinalizacion.value = "";
  } catch (error) {
    console.error("Error al asignar prácticas:", error);
    alert("Error al asignar prácticas");
  }
};
</script>

<template>
  <section class="max-h-screen flex items-center">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
        Asignación de Prácticas
      </h2>

      <div class="mx-auto max-w-lg">
        <form @submit.prevent="asignarPracticas" class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
          <div class="space-y-4">
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">Alumno*</label>
              <input v-model="busquedaAlumno" @focus="showAlumnos = true"  type="text"
                class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" placeholder="Buscar alumno..." />

              <div v-show="showAlumnos && alumnosFiltrados.length" class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                <div v-for="alumno in alumnosFiltrados" :key="alumno.id_estudiante" @mousedown="busquedaAlumno = `${alumno.nombre} ${alumno.apellido}`; showAlumnos = false"
                  class="p-3 hover:bg-gray-50 cursor-pointer text-sm">
                  {{ alumno.nombre }} {{ alumno.apellido }}
                </div>
              </div>
            </div>

            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">Empresa*</label>
              <input v-model="busquedaEmpresa" @focus="showEmpresas = true"  type="text"
                class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" placeholder="Buscar empresa..." />

              <div v-show="showEmpresas && empresasFiltradas.length" class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                <div v-for="empresa in empresasFiltradas" :key="empresa.id_empresa" @mousedown="busquedaEmpresa = empresa.nombre; showEmpresas = false"
                  class="p-3 hover:bg-gray-50 cursor-pointer text-sm">
                  {{ empresa.nombre }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700">Fecha de inicio*</label>
                <input v-model="fechaAsignacion" type="date" required class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Fecha de fin*</label>
                <input v-model="fechaFinalizacion" type="date" required class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" />
              </div>
            </div>
          </div>

          <button type="submit" class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-6 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400">
            Asignar Prácticas
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
