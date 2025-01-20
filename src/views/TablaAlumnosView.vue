<script setup>
import { ref, onMounted } from "vue";
import TableAlumnos from "../components/AllTable.vue";
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
      <!-- Renderizar encabezado de estudiantes -->
      <TablesThead :empresa="true" />

      <!-- Renderizar tabla de alumnos -->
      <TableAlumnos
        v-for="estudiante in estudiantes"
        :key="estudiante.id_estudiante"
        :estudiante="estudiante"
      />
    </div>
  </div>
</template>
