<script setup>
import { ref, onMounted, computed } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getAsignaciones, getEstudiantes, getEmpresas } from "../composables/useDatabase";
import FilterInput from '../components/FilterInput.vue'; // Añadir importación

// Estados reactivos
const asignaciones = ref([]);
const error = ref(null);
const filterText = ref(''); // Añadir estado para el filtro

// Función para manejar el filtro
function handleFilter(value) {
  filterText.value = value;
}

// Propiedad computada para filtrar Asignaciones
const filteredAsignaciones = computed(() => {
  if (!filterText.value) return asignaciones.value;

  const searchTerm = filterText.value.toLowerCase();
  return asignaciones.value.filter(asignacion => {
    return (
      asignacion.id_asignacion.toString().includes(searchTerm) ||
      asignacion.id_estudiante.toString().includes(searchTerm) ||
      asignacion.id_empresa.toString().includes(searchTerm) ||
      (asignacion.nombre_estudiante && asignacion.nombre_estudiante.toLowerCase().includes(searchTerm)) ||
      (asignacion.nombre && asignacion.nombre.toLowerCase().includes(searchTerm))
    );
  });
});

// Cargar Asignaciones al montar el componente
onMounted(async () => {
  try {
    const { fetchAsignaciones } = getAsignaciones();
    const data = await fetchAsignaciones();
    asignaciones.value = data.rows || [];

    // Si los nombres no están incluidos, puedes obtenerlos aquí
    const { fetchEstudiantes } = getEstudiantes();
    const estudiantesData = await fetchEstudiantes();
    const estudiantesMap = new Map(estudiantesData.rows.map(e => [e.id_estudiante, e.nombre + e.apellido]));

    const { fetchEmpresas } = getEmpresas();
    const empresasData = await fetchEmpresas();
    const empresasMap = new Map(empresasData.rows.map(e => [e.id_empresa, e.nombre]));

    // Añadir nombres a las asignaciones
    asignaciones.value = asignaciones.value.map(asignacion => ({
      ...asignacion,
      nombre_estudiante: estudiantesMap.get(asignacion.id_estudiante) || 'Desconocido',
      nombre: empresasMap.get(asignacion.id_empresa) || 'Desconocido'
    }));
  } catch (err) {
    error.value = "Hubo un error al cargar los datos.";
    console.error(err);
  }
});
</script>

<template>
  <div>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <div v-else>
      <!-- Añadir componente de filtro -->
      <FilterInput @filter="handleFilter" />
      
      <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
        <table class="min-w-full divide-y divide-gray-300 bg-white text-sm">
          <!-- Renderizar encabezado de Asignaciones -->
          <TablesThead :asignacion="true" />
    
          <!-- Renderizar tabla de asignaciones FILTRADAS -->
          <AllTable
            v-for="asignacion in filteredAsignaciones"
            :key="asignacion.id_asignacion"
            :asignacion="asignacion"
          />
        </table>
      </div>
    </div>
  </div>
</template>