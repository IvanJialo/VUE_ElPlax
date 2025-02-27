<script setup>
import { ref, onMounted, computed } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getProfesores } from "../composables/useDatabase";
import FilterInput from '../components/FilterInput.vue';

// Estados reactivos
const profesores = ref([]);
const error = ref(null);
const filterText = ref('');

// Función para manejar el filtro
function handleFilter(value) {
  filterText.value = value;
}

// Propiedad computada para filtrar profesores
const filteredProfesores = computed(() => {
  if (!filterText.value) return profesores.value; // Si no hay filtro, devuelve todos los profesores

  const searchTerm = filterText.value.toLowerCase();
  return profesores.value.filter(profesor => {
    return (
      profesor.nombre.toLowerCase().includes(searchTerm) ||
      profesor.apellido.toLowerCase().includes(searchTerm)
    );
  });
});

// Cargar profesores al montar el componente
onMounted(async () => {
  try {
    const { fetchProfesores } = getProfesores();
    const data = await fetchProfesores();
    profesores.value = data.rows || [];
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
      <FilterInput @filter="handleFilter" placeholder="Buscar por nombre o apellido..." />

      <!-- Tabla de profesores -->
      <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
        <table class="min-w-full divide-y divide-gray-300 bg-white text-sm">
          <!-- Renderizar encabezado de profesores -->
          <TablesThead :profesor="true" />

          <!-- Renderizar tabla de profesores filtrados -->
          <AllTable
            v-for="profesor in filteredProfesores"
            :key="profesor.id_profesor"
            :profesor="profesor"
          />
        </table>
      </div>
    </div>
  </div>
</template>