<script setup>
import { ref, onMounted, computed } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getRegistros, getEmpresas, getProfesores } from "../composables/useDatabase";
import FilterInput from '../components/FilterInput.vue';

// Estados reactivos
const registros = ref([]);
const empresas = ref([]);
const profesores = ref([]);
const error = ref(null);
const crearPDF = ref(false);
const filterText = ref('');

// Manejador de filtro
function handleFilter(value) {
  filterText.value = value;
}

// Registros con nombres mapeados
const registrosConNombres = computed(() => {
  const empresasMap = new Map(empresas.value.map(e => [e.id_empresa, e.nombre]));
  const profesoresMap = new Map(profesores.value.map(p => [p.id_profesor, p.nombre]));
  
  return registros.value.map(registro => ({
    ...registro,
    nombre_empresa: empresasMap.get(registro.id_empresa) || 'Desconocido',
    nombre_profesor: profesoresMap.get(registro.id_profesor) || 'Desconocido'
  }));
});

// Registros filtrados
const filteredRegistros = computed(() => {
  if (!filterText.value) return registrosConNombres.value;
  
  const searchTerm = filterText.value.toLowerCase();
  return registrosConNombres.value.filter(registro => {
    return (
      registro.nombre_empresa.toLowerCase().includes(searchTerm) ||
      registro.nombre_profesor.toLowerCase().includes(searchTerm)
    );
  });
});

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    // Cargar empresas y profesores primero
    const { fetchEmpresas } = getEmpresas();
    const empresasData = await fetchEmpresas();
    empresas.value = empresasData.rows || [];

    const { fetchProfesores } = getProfesores();
    const profesoresData = await fetchProfesores();
    profesores.value = profesoresData.rows || [];

    // Cargar registros
    const { fetchRegistros } = getRegistros();
    const data = await fetchRegistros();
    registros.value = data.rows || [];

    // Configuración PDF
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(localStorage.setItem('crearPDF', false));
      }, 100);
    });
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
      <FilterInput @filter="handleFilter" placeholder="Buscar por empresa o profesor..." />
      
      <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
        <table class="min-w-full divide-y divide-gray-300 bg-white text-sm">
          <!-- Encabezado de la tabla -->
          <TablesThead :registro="true" />

          <!-- Renderizar tabla de registros FILTRADOS -->
          <AllTable
            v-for="registro in filteredRegistros"
            :key="registro.id_registros"
            :registro="registro"
          />
        </table>
      </div>
    </div>
  </div>
</template>