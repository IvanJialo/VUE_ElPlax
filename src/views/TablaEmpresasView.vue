<script setup>
import { ref, onMounted } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getEmpresas } from "../composables/useDatabase";

// Estados reactivos
const empresas = ref([]);
const error = ref(null);

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
  <div>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <div v-else>
      <!-- Renderizar encabezado de empresas -->
      <TablesThead :empresa="true" />

      <!-- Renderizar tabla de alumnos -->
      <AllTable
        v-for="empresa in empresas"
        :key="empresa.id_empresa"
        :empresa="empresa"
      />
    </div>
  </div>
</template>
