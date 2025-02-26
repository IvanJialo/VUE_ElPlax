<!-- ImportExportView.vue -->
<template>
  <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <h2 class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
      Importar/Exportar Datos
    </h2>

    <div class="flex flex-col justify-center space-y-4">
      <p class="text-center">
        Puedes importar los datos de las empresas desde un archivo CSV.
        Descarga la plantilla haciendo clic en el boton de abajo.
      </p>

      <div class="flex justify-center">
        <button @click="descargarPlantilla" class="block w-[300px] cursor-pointer rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-4 text-sm font-medium text-white shadow-sm hover:opacity-90">
          Descargar Plantilla CSV
        </button>
      </div>

      <div class="flex justify-center">
        <label for="file-upload" class="cursor-pointer text-center align-items-center w-[300px] rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-4 text-sm font-medium text-white shadow-sm hover:opacity-90">
          Importar Datos
          <input id="file-upload" type="file" accept=".csv" class="hidden" @change="handleFileUpload" />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Papa from 'papaparse';

const emit = defineEmits(['data-imported']);

const descargarPlantilla = () => {
  const csvContent = `data:text/csv;charset=utf-8,title,empresas\n"nombre","nombre_oficial","direccion_sede_central","poblacion","codigo_postal","provincia","telefono_empresa","actividad_principal","otras_actividades","descripcion_breve","interesado_en","estado_actual","id_profesor"\n"Empresa Ejemplo","Nombre Oficial Ejemplo","Calle Falsa 123","Madrid","28001","Madrid","600123456","Desarrollo de software","Consultoría","Empresa de tecnología","Soporte","Potencial",1\n"title","contactos"\n"id_empresa","nombre","email","telefono"\n"title","estudiantes"\n"dni","nombre","apellido","id_clase","fecha_nacimiento","direccion","email","telefono","tiene_vehiculo"`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "plantilla_empresas.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
        if (row.length === 0) return; // Ignorar filas vacías

        if (row.length === 2 && row[0].toLowerCase() === 'title') {
          currentSection = row[1].toLowerCase();
          return;
        }

        if (!currentSection) {
          console.warn('Fila sin sección definida:', row);
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
              id_profesor: parseInt(row[12], 10) || null,
            });
            break;
          case 'contactos':
            if (row.length !== 4) {
              console.warn(`Fila inválida en sección Contactos: ${row}`);
              break;
            }
            contactos.push({
              id_empresa: parseInt(row[0], 10) || null,
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
              id_clase: parseInt(row[3], 10) || null,
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

