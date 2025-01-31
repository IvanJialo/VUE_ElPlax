<script setup>
import { defineProps } from 'vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { deleteEstudianteId, deleteEmpresaId, getClases, getEstudiantes, getEmpresas } from '../composables/useDatabase';

const router = useRouter();
// Definiendo las props
const props = defineProps({
  estudiante: {
    type: Object,
    required: false,
  },
  empresa: {
    type: Object,
    required: false,
  },
  asignacion: {
    type: Object,
    required: false,
  },
});

const clases = ref([]);
const nombreEstudiante = ref('Cargando...');
const nombreEmpresa = ref('Cargando...');

onMounted(async () => {
  const { fetchClases } = getClases();
  const result = await fetchClases();
  if (result) {
    clases.value = result.rows;
  }

  // Cargar el nombre del estudiante si existe una asignación
  if (props.asignacion?.id_estudiante) {
    nombreEstudiante.value = await obtenerNombreEstudiante(props.asignacion.id_estudiante);
  }

  // Cargar el nombre de la empresa si existe una asignación
  if (props.asignacion?.id_empresa) {
    nombreEmpresa.value = await obtenerNombreEmpresa(props.asignacion.id_empresa);
  }
});

function nombreDeClase(id) {
  const clase = clases.value.find((clase) => clase.id_clase === id);
  return clase ? clase.nombre_clase : 'No asignado';
}

// Función para obtener el nombre del estudiante usando getEstudiantes
async function obtenerNombreEstudiante(id) {
  try {
    const { fetchEstudiantes } = getEstudiantes();
    const estudiantes = await fetchEstudiantes();
    const estudiante = estudiantes.rows.find((est) => est.id_estudiante === id);
    return estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : 'Desconocido';
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    return 'Desconocido';
  }
}

// Función para obtener el nombre de la empresa usando getEmpresas
async function obtenerNombreEmpresa(id) {
  try {
    const { fetchEmpresas } = getEmpresas();
    const empresas = await fetchEmpresas();
    const empresa = empresas.rows.find((emp) => emp.id_empresa === id);
    return empresa ? empresa.nombre_empresa : 'Desconocido';
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    return 'Desconocido';
  }
}

function editarEstudiante(id) {
  localStorage.setItem('idEstudiante', id);
  router.push('/editarAlumno');
}

function eliminarEstudiante(id) {
  if (confirm('¿Estás seguro de eliminar este estudiante?')) {
    deleteEstudianteId(id);
    router.push('/estudiantes');
  }
}

function editarEmpresa(id) {
  localStorage.setItem('idEmpresa', id);
  router.push('/editarEmpresa');
}

function eliminarEmpresa(id) {
  if (confirm('¿Estás seguro de eliminar esta empresa?')) {
    deleteEmpresaId(id);
    router.push('/empresas');
  }
}
</script>

<template>
  <!-- <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
    <table class="min-w-full divide-y divide-gray-300 bg-white text-sm"> -->
      <!-- Cuerpo para Estudiantes -->
      <tbody class="divide-y divide-gray-200" v-if="estudiante && !empresa && !asignacion">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-4 py-3 text-gray-900 font-medium">{{ estudiante.id_estudiante }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.dni }}</td>
          <td class="px-4 py-3 text-gray-900">{{ estudiante.nombre }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.apellido }}</td>
          <td class="px-4 py-3 text-gray-700">{{ nombreDeClase(estudiante.id_clase) }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.fecha_nacimiento }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.direccion }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.email }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.telefono }}</td>
          <td class="px-4 py-3 text-center">
            <span v-if="estudiante.tiene_vehiculo" class="inline-block w-6 h-6 bg-green-100 text-green-700 rounded-full">✓</span>
            <span v-else class="inline-block w-6 h-6 bg-red-100 text-red-700 rounded-full">✕</span>
          </td>
          <td class="px-4 py-3 flex justify-center gap-2">
            <button 
              @click="editarEstudiante(estudiante.id_estudiante)"
              class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </button>
            <button 
              @click="eliminarEstudiante(estudiante.id_estudiante)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>

      <!-- Cuerpo para Empresas -->
      <tbody class="divide-y divide-gray-200" v-if="empresa && !estudiante && !asignacion">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-4 py-3 text-gray-900 font-medium">{{ empresa.id_empresa }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.CIF }}</td>
          <td class="px-4 py-3 text-gray-900">{{ empresa.nombre_empresa }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.telefono }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.email }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.direccion }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.capacidad }}</td>
          <td class="px-4 py-3 flex justify-center gap-2">
            <button 
              @click="editarEmpresa(empresa.id_empresa)"
              class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </button>
            <button 
              @click="eliminarEmpresa(empresa.id_empresa)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>

      <!-- Cuerpo para Asignaciones -->
      <tbody class="divide-y divide-gray-200" v-if="asignacion && !empresa && !estudiante">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-4 py-3 text-gray-900 font-medium">{{ asignacion.id_asignacion }}</td>
          <td class="px-4 py-3 text-gray-700">{{ nombreEstudiante }}</td>
          <td class="px-4 py-3 text-gray-700">{{ nombreEmpresa }}</td>
          <td class="px-4 py-3 text-gray-700">{{ asignacion.fecha_asignacion }}</td>
          <td class="px-4 py-3 text-gray-700">{{ asignacion.fecha_finalizacion }}</td>
        </tr>
      </tbody>

      <!-- Mensaje sin datos -->
      <tbody v-if="!estudiante && !empresa && !asignacion">
        <tr>
          <td colspan="12" class="px-4 py-6 text-center text-gray-500">
            <div class="inline-flex items-center gap-2">
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="font-medium">No hay datos disponibles</span>
            </div>
          </td>
        </tr>
      </tbody>
    <!-- </table>
  </div> -->
</template>
