<script setup>
import { ref, onMounted, computed } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getClases, getProfesores } from "../composables/useDatabase";
import FilterInput from '../components/FilterInput.vue';

// Estados reactivos
const clases = ref([]);
const profesores = ref([]);
const error = ref(null);
const filterText = ref('');

// Función para manejar el filtro
function handleFilter(value) {
  filterText.value = value;
}

// Propiedad computada para filtrar clases
const filteredClases = computed(() => {
  if (!filterText.value) return clases.value; // Si no hay filtro, devuelve todas las clases

  const searchTerm = filterText.value.toLowerCase();
  return clases.value.filter(clase => {
    const nombreProfesor = profesores.value.find(p => p.id_profesor === clase.id_profesor)?.nombre || 'Desconocido';
    return (
      clase.nombre_clase.toLowerCase().includes(searchTerm) ||
      nombreProfesor.toLowerCase().includes(searchTerm)
    );
  });
});

// Cargar clases y profesores al montar el componente
onMounted(async () => {
  try {
    // Cargar profesores
    const { fetchProfesores } = getProfesores();
    const profesoresData = await fetchProfesores();
    profesores.value = profesoresData.rows || [];

    // Cargar clases
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
      <FilterInput @filter="handleFilter" placeholder="Buscar por nombre de clase o profesor..." />

      <!-- Tabla de clases -->
      <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
        <table class="min-w-full divide-y divide-gray-300 bg-white text-sm">
          <!-- Renderizar encabezado de clases -->
          <TablesThead :clase="true" />

          <!-- Renderizar tabla de clases filtradas -->
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