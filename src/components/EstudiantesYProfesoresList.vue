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
    <br>
    <div>
      <h1>Lista de Profesores</h1>
      <ul>
        <li v-for="profesor in profesores" :key="profesor.id_profesor">
          {{ profesor.nombre }} - {{ profesor.apellido }}
        </li>
      </ul>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { getEstudiantes, getProfesores } from "@/composables/useDatabase"; // Ajusta la ruta si es necesario
  
  export default {
    name: "EstudiantesList",
    setup() {
      const estudiantes = ref([]);
      const profesores = ref([]);
      const error = ref(null);
      const { fetchEstudiantes } = getEstudiantes();
      const { fetchProfesores } = getProfesores();
      

  
      onMounted(async () => {
        try {
          const data = await fetchEstudiantes();
          estudiantes.value = data.rows; // Asegúrate de ajustar según el formato de respuesta
        } catch (err) {
          error.value = "Hubo un error al cargar los datos.";
          console.error(err);
        }
      });
  
      onMounted(async () => {
        try {
          const data = await fetchProfesores();
          profesores.value = data.rows; // Asegúrate de ajustar según el formato de respuesta
        } catch (err) {
          error.value = "Hubo un error al cargar los datos.";
          console.error(err);
        }
      });
  
      return { estudiantes, profesores, error };
    },
  };
  </script>
  
  <style>
  .error {
    color: red;
  }
  </style>