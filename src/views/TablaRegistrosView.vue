<script setup>
import { ref, onMounted } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getRegistros } from "../composables/useDatabase";

// Estados reactivos
const registros = ref([]);
const error = ref(null);

// Cargar registros al montar el componente
onMounted(async () => {
  try {
    const { fetchRegistros } = getRegistros();
    const data = await fetchRegistros();
    registros.value = data.rows || [];
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
      <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
        <table class="min-w-full divide-y divide-gray-300 bg-white text-sm">
          <!-- Renderizar encabezado de registros -->
          <TablesThead :registro="true" />

          <!-- Renderizar tabla de registros -->
          <AllTable
            v-for="registro in registros"
            :key="registro.id_registros"
            :registro="registro"
          />
        </table>
      </div>
    </div>
  </div>
</template>
