<script setup>
import { ref, onMounted } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getAsignaciones } from "../composables/useDatabase";

// Estados reactivos
const asignaciones = ref([]);
const error = ref(null);

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
      <!-- Renderizar encabezado de Asignaciones -->
      <TablesThead :asignacion="true" />

      <!-- Renderizar tabla de alumnos -->
      <AllTable
        v-for="asignacion in asignaciones"
        :key="asignacion.id_asignacion"
        :asignacion="asignacion"
      />
    </div>
  </div>
</template>
