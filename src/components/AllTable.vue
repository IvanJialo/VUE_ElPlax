<script setup>
import { defineProps } from 'vue';
import { ref, onMounted } from 'vue';
import { deleteEstudianteId, deleteEmpresaId, getClases, getEstudiantes, getEmpresas } from '../composables/useDatabase';

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
  this.router.push('/editarAlumno');
}

function eliminarEstudiante(id) {
  if (confirm('¿Estás seguro de eliminar este estudiante?')) {
    deleteEstudianteId(id);
    this.router.push('/estudiantes');
  }
}

function editarEmpresa(id) {
  localStorage.setItem('idEmpresa', id);
  this.router.push('/editarEmpresa');
}

function eliminarEmpresa(id) {
  if (confirm('¿Estás seguro de eliminar esta empresa?')) {
    deleteEmpresaId(id);
    this.router.push('/empresas');
  }
}
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-gray-200 my-4">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <!-- Renderizar datos de asignación -->
      <tbody class="divide-y divide-gray-200" v-if="estudiante && !empresa && !asignacion">
        <tr>
          <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ estudiante.id_estudiante }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.dni }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.nombre }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.apellido }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ nombreDeClase(estudiante.id_clase) }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.fecha_nacimiento }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.direccion }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.email }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.telefono }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <span v-if="estudiante.tiene_vehiculo">✅</span>
            <span v-else>❌</span>
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <button @click="editarEstudiante(estudiante.id_estudiante)">📝</button>
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <button @click="eliminarEstudiante(estudiante.id_estudiante)">🗑️</button>
          </td>
        </tr>
      </tbody>
      <!-- Renderizar datos de empresa si existe -->
      <tbody class="divide-y divide-gray-200" v-if="empresa && !estudiante && !asignacion">
        <tr>
          <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ empresa.id_empresa }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ empresa.CIF }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ empresa.nombre_empresa }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ empresa.telefono }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ empresa.email }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ empresa.direccion }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ empresa.capacidad }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <button @click="editarEmpresa(empresa.id_empresa)">📝</button>
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <button @click="eliminarEmpresa(empresa.id_empresa)">🗑️</button>
          </td>
        </tr>
      </tbody>
      <tbody class="divide-y divide-gray-200" v-if="asignacion && !empresa && !estudiante">
        <tr>
          <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ asignacion.id_asignacion }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            {{ nombreEstudiante }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            {{ nombreEmpresa }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ asignacion.fecha_asignacion }}</td>
        </tr>
      </tbody>
      <!-- Mensaje en caso de no recibir datos válidos -->
      <tfoot v-if="!estudiante && !empresa && !asignacion">
        <tr>
          <td colspan="4" class="whitespace-nowrap px-4 py-2 text-center text-gray-500">
            No hay datos disponibles para mostrar.
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
