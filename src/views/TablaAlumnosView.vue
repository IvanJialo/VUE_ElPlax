<script setup>
import { ref, onMounted, computed } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getEstudiantes } from "../composables/useDatabase";
import FilterInput from '../components/FilterInput.vue';

// Estados reactivos
const estudiantes = ref([]);
const error = ref(null);
const filterText = ref('');

// Función para manejar el filtro
function handleFilter(value) {
  filterText.value = value;
}

// Propiedad computada para filtrar estudiantes
const filteredEstudiantes = computed(() => {
  if (!filterText.value) return estudiantes.value; // Si no hay filtro, devuelve todos los estudiantes
  return estudiantes.value.filter(estudiante => {
    // Filtra por nombre, apellido, DNI, etc.
    return (
      estudiante.nombre.toLowerCase().includes(filterText.value) ||
      estudiante.apellido.toLowerCase().includes(filterText.value) ||
      estudiante.dni.toLowerCase().includes(filterText.value)
    );
  });
});

// Cargar estudiantes al montar el componente
onMounted(async () => {
  try {
    const { fetchEstudiantes } = getEstudiantes();
    const data = await fetchEstudiantes();
    estudiantes.value = data.rows || [];
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

      <!-- Tabla de estudiantes -->
      <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
        <table class="min-w-full divide-y divide-gray-300 bg-white text-sm">
          <!-- Renderizar encabezado de estudiantes -->
          <TablesThead :estudiante="true" />

          <!-- Renderizar tabla de alumnos filtrados -->
          <AllTable
            v-for="estudiante in filteredEstudiantes"
            :key="estudiante.id_estudiante"
            :estudiante="estudiante"
          />
        </table>
      </div>
    </div>
  </div>
</template>