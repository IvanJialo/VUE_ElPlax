<script setup>
import { ref, onMounted, computed } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getClases } from "../composables/useDatabase";
import FilterInput from '../components/FilterInput.vue';

// Estados reactivos
const clases = ref([]);
const error = ref(null);
const filterText = ref('');

// Función para manejar el filtro
function handleFilter(value) {
  filterText.value = value;
}

// Propiedad computada para filtrar estudiantes
const filteredClases = computed(() => {
  if (!filterText.value) return clases.value; // Si no hay filtro, devuelve todos los clases
  return clases.value.filter(clase => {
    // Filtra por nombre, apellido, DNI, etc.
    return (
      clase.nombre.toLowerCase().includes(filterText.value) ||
      clase.apellido.toLowerCase().includes(filterText.value) ||
      clase.dni.toLowerCase().includes(filterText.value)
    );
  });
});

// Cargar clases al montar el componente
onMounted(async () => {
  try {
    const { fetchClases } = getClases();
    const data = await fetchClases();
    clases.value = data.rows || [];
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
      <!-- Componente de filtro -->
      <FilterInput @filter="handleFilter" />

      <!-- Tabla de clases -->
      <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
        <table class="min-w-full divide-y divide-gray-300 bg-white text-sm">
          <!-- Renderizar encabezado de clases -->
          <TablesThead :clase="true" />

          <!-- Renderizar tabla de alumnos filtrados -->
          <AllTable
            v-for="clase in filteredClases"
            :key="clase.id_clase"
            :clase="clase"
          />
        </table>
      </div>
    </div>
  </div>
</template>