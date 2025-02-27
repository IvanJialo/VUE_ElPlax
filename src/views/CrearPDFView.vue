<template>
  <div>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <div v-else>
      <div class="flex flex-col space-y-4">
        <div class="flex flex-col">
          <label for="observacion" class="block text-sm font-medium text-gray-700">Observaciones</label>
          <textarea
            v-model="txtDocumentPDF"
            id="observacion"
            class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm"
            placeholder="Notas adicionales..."
            rows="4"
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button @click="botonCrearPDF" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Crear PDF</button>
        </div>
      </div>

      <!-- Componente de filtro -->
      <FilterInput @filter="handleFilter" placeholder="Buscar por empresa o profesor..." />

      <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
        <table class="min-w-full divide-y divide-gray-300 bg-white text-sm">
          <!-- Renderizar encabezado de registros -->
          <TablesThead :crearPDF="true" />

          <!-- Renderizar tabla de registros filtrados -->
          <AllTable
            v-for="registro in filteredRegistros"
            :key="registro.id_registros"
            :registro="registro"
          />
        </table>
      </div>
    </div>

    <!-- Modal de Confirmación -->
    <ModalConfirmation
      :isOpen="isModalOpen"
      title="PDF Creado"
      message="El PDF se ha creado correctamente."
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AllTable from "../components/AllTable.vue";
import TablesThead from "../components/TablesThead.vue";
import { getRegistros, getRegistrosID, getEmpresas, getProfesores, getProfesoresID } from "../composables/useDatabase";
import { getListaDocumentoRegistros } from '../composables/usePDF';
import FilterInput from '../components/FilterInput.vue'; // Importar el componente de filtro
import ModalConfirmation from '../components/ModalConfirmation.vue'; // Importar el componente del modal

// Estados reactivos
const registros = ref([]);
const empresas = ref([]);
const profesores = ref([]);
const error = ref(null);
const txtDocumentPDF = ref('');
const lista = ref([]);
const crearPDF = ref(false);
const filterText = ref(''); // Estado para el filtro
const isModalOpen = ref(false); // Estado para el modal

// Función para manejar el filtro
function handleFilter(value) {
  filterText.value = value;
}

// Propiedad computada para filtrar registros
const filteredRegistros = computed(() => {
  if (!filterText.value) return registros.value; // Si no hay filtro, devuelve todos los registros

  const searchTerm = filterText.value.toLowerCase();
  return registros.value.filter(registro => {
    const nombreEmpresa = empresas.value.find(e => e.id_empresa === registro.id_empresa)?.nombre || 'Desconocido';
    const nombreProfesor = profesores.value.find(p => p.id_profesor === registro.id_profesor)?.nombre || 'Desconocido';
    return (
      nombreEmpresa.toLowerCase().includes(searchTerm) ||
      nombreProfesor.toLowerCase().includes(searchTerm)
    );
  });
});

// Cargar registros, empresas y profesores al montar el componente
onMounted(async () => {
  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(localStorage.setItem('crearPDF', true));
      }, 100); // Simulando posible retraso
    });

    // Cargar empresas
    const { fetchEmpresas } = getEmpresas();
    const empresasData = await fetchEmpresas();
    empresas.value = empresasData.rows || [];

    // Cargar profesores
    const { fetchProfesores } = getProfesores();
    const profesoresData = await fetchProfesores();
    profesores.value = profesoresData.rows || [];

    // Cargar registros
    const { fetchRegistros } = getRegistros();
    const data = await fetchRegistros();
    registros.value = data.rows || [];
  } catch (err) {
    error.value = "Hubo un error al cargar los datos.";
    console.error(err);
  }
});

async function obtenerNombreEmpresa(id) {
  try {
    const { fetchEmpresas } = getEmpresas();
    const empresas = await fetchEmpresas();
    const empresa = empresas.rows.find((emp) => emp.id_empresa === id);
    return empresa ? empresa.nombre : 'Desconocido';
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    return 'Desconocido';
  }
}

async function botonCrearPDF() {
  console.log("Creando PDF...");
  localStorage.setItem("txtDocumentPDF", txtDocumentPDF.value);
  localStorage.setItem(
    "listaDocumentoRegistros",
    JSON.stringify(getListaDocumentoRegistros().value)
  );

  const idProfesor = localStorage.getItem("idProfesor") || "Profesor Desconocido";
  const observaciones = localStorage.getItem("txtDocumentPDF") || "";

  // Recuperamos los datos almacenados en localStorage
  lista.value = JSON.parse(localStorage.getItem("listaDocumentoRegistros")) || [];

  // Usamos Promise.all para esperar a que todas las consultas asíncronas se completen
  const array = await Promise.all(lista.value.map(async (id) => {
    const result = await getRegistrosID(id);
    if (!result || !result.rows || result.rows.length === 0) {
      console.warn(`No se encontraron datos para ID: ${id}`);
      return null; // Devuelve null si no hay datos
    }
    return result.rows[0]; // Extrae la primera fila de datos
  }));

  // Filtra los elementos nulos para evitar problemas en la tabla
  const filteredArray = array.filter(row => row !== null);

  console.log("Datos cargados para el PDF:", array); // Verifica que los datos están llegando correctamente

  const doc = new jsPDF("landscape");
  doc.setFontSize(16);
  const profesor = await getProfesoresID(idProfesor);
  doc.text(`Listado de registros hecho por ${profesor?.rows?.[0]?.nombre}`, 14, 20);
  doc.setFontSize(12);
  doc.text(`Observaciones: ${observaciones}`, 14, 30);
  doc.text("Registros:", 14, 40);

  // Transformamos los datos para que se incluyan en la tabla correctamente
  const bodyData = await Promise.all(filteredArray.map(async (row) => {
    const [empresaResult, profesorResult] = await Promise.all([
      obtenerNombreEmpresa(row.id_empresa),
      getProfesoresID(row.id_profesor),
    ]);

    // Asegurar que los resultados tienen datos válidos
    const profesor = profesorResult?.rows?.[0]?.nombre || "-";

    return [
      row.id_registros,
      row.fecha_asignacion || "-",
      empresaResult,
      profesor,
      row.llamada_registrada ? "Si" : "No",
      row.correo_registrado ? "Si" : "No",
      row.reunion_registrada ? "Si" : "No",
      row.observacion || "-",
    ];
  }));

  doc.autoTable({
    startY: 45,
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 30 },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 },
      6: { cellWidth: 30 },
      7: { cellWidth: 70 },
    },
    head: [
      [
        "ID",
        "Fecha",
        "Empresa",
        "Profesor",
        "Llamada",
        "Correo",
        "Reunión",
        "Observación",
      ],
    ],
    body: bodyData, // Se pasa el array completo con todas las filas
    horizontalPageBreak: true
  });

  doc.save("Listado_Registros.pdf");

  // Abrir el modal después de crear el PDF
  isModalOpen.value = true;
}

const closeModal = () => {
  isModalOpen.value = false;
};
</script>
