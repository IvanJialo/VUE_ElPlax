<script setup>
import { ref, onMounted, computed } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getAsignaciones } from "../composables/useDatabase";
import FilterInput from '../components/FilterInput.vue'; // Añadir importación

// Estados reactivos
const asignaciones = ref([]);
const error = ref(null);
const filterText = ref(''); // Añadir estado para el filtro

// Función para manejar el filtro
function handleFilter(value) {
  filterText.value = value;
}

// Lista filtrada de asignaciones
const filteredAsignaciones = computed(() => {
  if (!filterText.value) return asignaciones.value;
  
  return asignaciones.value.filter(asignacion => {
    // Buscar en todos los campos relevantes
    return (
      asignacion.nombreEstudiante?.toLowerCase().includes(filterText.value) ||
      asignacion.nombreEmpresa?.toLowerCase().includes(filterText.value) ||
      asignacion.fecha_asignacion?.toLowerCase().includes(filterText.value) ||
      asignacion.fecha_finalizacion?.toLowerCase().includes(filterText.value) ||
      asignacion.id_asignacion?.toString().includes(filterText.value)
    );
  });
});

// Cargar Asignaciones al montar el componente
onMounted(async () => {
  try {
    const { fetchAsignaciones } = getAsignaciones();
    const data = await fetchAsignaciones();
    asignaciones.value = data.rows || [];
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