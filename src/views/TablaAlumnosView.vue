<script setup>
import { ref, onMounted } from "vue";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getEstudiantes } from "../composables/useDatabase";

// Estados reactivos
const estudiantes = ref([]);
const error = ref(null);

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
      <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
        <table class="min-w-full divide-y divide-gray-300 bg-white text-sm">
          <!-- Renderizar encabezado de estudiantes -->
          <TablesThead :estudiante="true" />

          <!-- Renderizar tabla de alumnos -->
          <AllTable
            v-for="estudiante in estudiantes"
            :key="estudiante.id_estudiante"
            :estudiante="estudiante"
          />
        </table>
      </div>
    </div>
  </div>
</template>
