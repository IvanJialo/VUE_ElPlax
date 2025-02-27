<template>
  <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <h2 class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
      Importar/Exportar Datos
    </h2>

    <div class="flex flex-col justify-center space-y-4">
      <p class="text-center">
        Puedes importar los datos de las empresas desde un archivo CSV.
        Descarga la plantilla haciendo clic en el botón de abajo.
      </p>

      <div class="flex justify-center">
        <DownloadTemplateButton />
      </div>

      <div class="flex justify-center">
        <ImportCSVButton @data-imported="handleDataImported" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { postInsertarEmpresas } from '../composables/useDatabase';
import DownloadTemplateButton from '../components/DownloadTemplateButton.vue';
import ImportCSVButton from '../components/ImportCSV.vue';

const handleDataImported = async (data) => {
  try {
    if (data.empresas && data.empresas.length > 0) {
      for (const empresa of data.empresas) {
        await postInsertarEmpresas(
          empresa.nombre,
          empresa.nombre_oficial,
          empresa.direccion_sede_central,
          empresa.poblacion,
          empresa.codigo_postal,
          empresa.provincia,
          empresa.telefono_empresa,
          empresa.actividad_principal,
          empresa.otras_actividades,
          empresa.descripcion_breve,
          empresa.interesado_en,
          empresa.estado_actual,
          empresa.id_profesor
        );
      }
    }
    console.log('Datos importados y guardados correctamente');
  } catch (error) {
    console.error('Error al importar datos:', error);
  }
};
</script>
