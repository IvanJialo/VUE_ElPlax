<template>
    <div>
      <h1>Lista de Estudiantes</h1>
      <ul>
        <li v-for="estudiante in estudiantes" :key="estudiante.id_estudiante">
          {{ estudiante.nombre }} - {{ estudiante.dni }}
        </li>
      </ul>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useDatabase } from "@/composables/useDatabase"; // Ajusta la ruta si es necesario
  
  export default {
    name: "EstudiantesList",
    setup() {
      const estudiantes = ref([]);
      const error = ref(null);
      const { fetchData } = useDatabase();
  
      onMounted(async () => {
        try {
          const data = await fetchData();
          estudiantes.value = data.rows; // Asegúrate de ajustar según el formato de respuesta
        } catch (err) {
          error.value = "Hubo un error al cargar los datos.";
          console.error(err);
        }
      });
  
      return { estudiantes, error };
    },
  };
  </script>
  
  <style>
  .error {
    color: red;
  }
  </style>