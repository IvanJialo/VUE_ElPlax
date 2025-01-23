<script setup>
import { defineProps } from 'vue';
import { ref, onMounted } from 'vue';
import { deleteEstudianteId } from '../composables/useDatabase';
import { deleteEmpresaId } from '../composables/useDatabase';
import { getClases } from '../composables/useDatabase';


const clases = ref([]);

onMounted(async () => {
  const { fetchClases } = getClases();
  const result = await fetchClases();
  if (result) {
    clases.value = result.rows;
  }
});


// Recibiendo las props
defineProps({
  estudiante: {
    type: Object,
    required: false, // Opcional
  },
  empresa: {
    type: Object,
    required: false, // Opcional
  },
  asignacion: {
    type: Object,
    required: false, // Opcional
  },
});

function editarEstudiante(id) {
  localStorage.setItem('idEstudiante', id);
  this.router.push('/editarAlumno');
}

function eliminarEstudiante(id) {
  if (confirm('¿Estás seguro de eliminar este estudiante?')) {
    deleteEstudianteId(id);
    this.rouer.push('/estudiantes');
  }
}

function editarEmpresa(id) {
  localStorage.setItem('idEmpresa', id);
  this.router.push('/editarEmpresa');
}

function eliminarEmpresa(id) {
  if (confirm('¿Estás seguro de eliminar este empresa?')) {
    deleteEmpresaId(id);
    this.rouer.push('/empresas');
  }
}

function nombreDeClase(id) {
  const clase = clases.value.find((clase) => clase.id_clase === id);
  return clase ? clase.nombre_clase : 'No asignado';
}

const obtenerNombreEstudiante = (id) => {
        const estudiante = estudiantes.find(est => est.id_estudiante === id);
        return estudiante ? estudiante.nombre + ' ' + estudiante.apellido : 'Desconocido';
    };

    // Función para obtener el nombre de una empresa por su ID
    const obtenerNombreEmpresa = (id) => {
        const empresa = empresas.find(emp => emp.id_empresa === id);
        return empresa ? empresa.nombre_empresa : 'Desconocido';
    };
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-gray-200 my-4">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <!-- Renderizar datos de estudiante si existe -->
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
            <button @click="eliminarEmpresa(empres.id_empresa)">🗑️</button>
          </td>
        </tr>
      </tbody>
      <tbody class="divide-y divide-gray-200" v-if="asignacion && !empresa && !estudiante">
        <tr>
          <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ asignacion.id_asignacion }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ obtenerNombreEstudiante(asignacion.id_estudiante) }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ obtenerNombreEmpresa(asignacion.id_empresa) }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ asignacion.fecha }}</td>
        </tr>
      </tbody>
      <!-- Mensaje en caso de no recibir datos válidos -->
      <tfoot v-if="!estudiante && !empresa">
        <tr>
          <td colspan="4" class="whitespace-nowrap px-4 py-2 text-center text-gray-500">
            No hay datos disponibles para mostrar.
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
