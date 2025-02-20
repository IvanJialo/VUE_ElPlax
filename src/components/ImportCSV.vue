<!-- ImportCSVButton.vue -->
<template>
    <button @click="triggerFileInput" class="flex items-center gap-2 px-4 py- text-gray-400 rounded-lg transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="#b197ff"
                d="m8.84 12l-4.92 4.92L2.5 15.5L5 13H0v-2h5L2.5 8.5l1.42-1.42zM12 3C8.59 3 5.68 4.07 4.53 5.57L5 6l1.03 1.07C6 7.05 6 7 6 7c0-.5 2.13-2 6-2s6 1.5 6 2s-2.13 2-6 2c-2.62 0-4.42-.69-5.32-1.28l3.12 3.12c.7.1 1.44.16 2.2.16c2.39 0 4.53-.53 6-1.36v2.81c-1.3.95-3.58 1.55-6 1.55c-.96 0-1.9-.1-2.76-.27l-1.65 1.64c1.32.4 2.82.63 4.41.63c2.28 0 4.39-.45 6-1.23V17c0 .5-2.13 2-6 2s-6-1.5-6-2v-.04L5 18l-.46.43C5.69 19.93 8.6 21 12 21c4.41 0 8-1.79 8-4V7c0-2.21-3.58-4-8-4" />
        </svg>
    </button>
    <input type="file" @change="handleFileUpload" accept=".csv" class="hidden" ref="fileInput" />
</template>

<script setup>
import { ref } from 'vue';
import Papa from 'papaparse';

const emit = defineEmits(['data-imported']);

const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: false,
    skipEmptyLines: true,
    complete: (results) => {
      if (results.errors.length > 0) {
        console.error('Error al leer el archivo CSV', results.errors);
        return;
      }

      const data = results.data;
      const empresas = [];
      const contactos = [];
      const estudiantes = [];

      let currentSection = null;

      data.forEach(row => {
        if (row.length === 2 && row[0] === 'title') {
          currentSection = row[1].toLowerCase();
          return;
        }

        switch (currentSection) {
          case 'empresas':
            if (row.length !== 13) {
              console.warn(`Fila inválida en sección Empresas: ${row}`);
              break;
            }
            empresas.push({
              nombre: row[0],
              nombre_oficial: row[1],
              direccion_sede_central: row[2],
              poblacion: row[3],
              codigo_postal: row[4],
              provincia: row[5],
              telefono_empresa: row[6],
              actividad_principal: row[7],
              otras_actividades: row[8],
              descripcion_breve: row[9],
              interesado_en: row[10],
              estado_actual: row[11],
              id_profesor: parseInt(row[12], 10) || null, // Asegurarse de que sea un número válido o null
            });
            break;
          case 'contactos':
            if (row.length !== 4) {
              console.warn(`Fila inválida en sección Contactos: ${row}`);
              break;
            }
            contactos.push({
              id_empresa: parseInt(row[0], 10) || null, // Asegurarse de que sea un número válido o null
              nombre: row[1],
              email: row[2],
              telefono: row[3],
            });
            break;
          case 'estudiantes':
            if (row.length !== 9) {
              console.warn(`Fila inválida en sección Estudiantes: ${row}`);
              break;
            }
            estudiantes.push({
              dni: row[0],
              nombre: row[1],
              apellido: row[2],
              id_clase: parseInt(row[3], 10) || null, // Asegurarse de que sea un número válido o null
              fecha_nacimiento: row[4],
              direccion: row[5],
              email: row[6],
              telefono: row[7],
              tiene_vehiculo: row[8] === 'true',
            });
            break;
          default:
            console.warn(`Sección desconocida: ${currentSection}`);
        }
      });

      emit('data-imported', { empresas, contactos, estudiantes });
    },
    error: (err) => {
      console.error('Error al leer el archivo CSV', err);
    },
  });
};
</script>