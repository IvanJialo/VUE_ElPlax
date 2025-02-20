<script setup>
import { ref, onMounted, computed } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getEmpresas } from "../composables/useDatabase";
import FilterInput from '../components/FilterInput.vue';

// Estados reactivos
const empresas = ref([]);
const error = ref(null);
const filterText = ref('');

// Función para manejar el filtro
function handleFilter(value) {
  filterText.value = value;
}

// Propiedad computada para filtrar estudiantes
const filteredEmpresas = computed(() => {
  if (!filterText.value) return empresas.value; // Si no hay filtro, devuelve todos los estudiantes
  return empresas.value.filter(empresa => {
    // Filtra por nombre
    return (
      empresa.nombre.toLowerCase().includes(filterText.value)
    );
  });
});

// Cargar empresas al montar el componente
onMounted(async () => {
  try {
    const { fetchEmpresas } = getEmpresas();
    const data = await fetchEmpresas();
    empresas.value = data.rows || [];
  } catch (err) {
    error.value = "Hubo un error al cargar los datos.";
    console.error(err);
  }
});
</script>

<template>
  <div class="ml-20 mr-4" >
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <div v-else>
      <!-- Componente de filtro -->
      <FilterInput @filter="handleFilter" />

      <!-- Tabla de Empresas -->
      <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
        <table class="min-w-full fit-con divide-y divide-gray-300 bg-white text-sm">
          <!-- Renderizar encabezado de empresas -->
          <TablesThead :empresa="true" />

          <!-- Renderizar tabla de alumnos -->
          <AllTable
            v-for="empresa in filteredEmpresas"
            :key="empresa.id_empresa"
            :empresa="empresa"
          />
        </table>
      </div>
    </div>
  </div>
</template>
