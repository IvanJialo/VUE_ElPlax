  <script setup>
  import { ref, onMounted } from "vue";
  import TableAlumnos from "../components/Table.vue";
  import { getEstudiantes } from "../composables/useDatabase";
  
  const estudiantes = ref([]);
  const error = ref(null);
  
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
        <TableAlumnos
          v-for="estudiante in estudiantes"
          :key="estudiante.id_estudiante"
          :estudiante="estudiante"
        />
      </div>
    </div>
  </template>
  