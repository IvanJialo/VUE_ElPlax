<!-- ImportCSV.vue -->
<template>
  <label
    for="file-upload"
    class="cursor-pointer text-center align-items-center w-[300px] rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-4 text-sm font-medium text-white shadow-sm hover:opacity-90"
  >
    Importar Datos
    <input
      id="file-upload"
      type="file"
      accept=".csv"
      class="hidden"
      @change="handleFileUpload"
    />
  </label>
  <ModalConfirmation
    :isOpen="isModalOpen"
    title="Importación Completada"
    message="Los datos se han importado correctamente."
    @close="closeModal"
  />
</template>

<script setup>
import { ref } from 'vue';
import Papa from 'papaparse';
import ModalConfirmation from './ModalConfirmation.vue';

const emit = defineEmits(['data-imported']);
const isModalOpen = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: (results) => {
      if (results.errors.length > 0) {
        console.error('Error al leer el archivo CSV', results.errors);
        return;
      }

      // Validar y mapear los datos
      const empresas = results.data.map(row => {
        // Verificar que la fila tenga 13 campos
        if (Object.keys(row).length !== 13) {
          console.warn(`Fila inválida: ${JSON.stringify(row)}`);
          return null;
        }

        // Mapear los campos correctamente
        return {
          nombre: row.nombre,
          nombre_oficial: row.nombre_oficial,
          direccion_sede_central: row.direccion_sede_central,
          poblacion: row.poblacion,
          codigo_postal: row.codigo_postal,
          provincia: row.provincia,
          telefono_empresa: row.telefono_empresa,
          actividad_principal: row.actividad_principal,
          otras_actividades: row.otras_actividades,
          descripcion_breve: row.descripcion_breve,
          interesado_en: row.interesado_en,
          estado_actual: row.estado_actual,
          id_profesor: parseInt(row.id_profesor, 10) || null, // Asegurar que sea un número
        };
      }).filter(row => row !== null); // Filtrar filas inválidas

      // Emitir los datos procesados
      emit('data-imported', { empresas });
      isModalOpen.value = true; // Abrir modal de confirmación
    },
    error: (err) => {
      console.error('Error al leer el archivo CSV', err);
    },
  });
};

const closeModal = () => {
    isModalOpen.value = false;
  };
</script>
