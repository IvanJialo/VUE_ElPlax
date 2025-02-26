<script setup>
import { ref, onMounted, defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import { deleteEstudianteId, deleteClaseId, deleteAsignacionId, deleteEmpresaId, getClases, getEstudiantes, getEmpresas, getRegistros, getProfesores } from '../composables/useDatabase';
import { getListaDocumentoRegistros } from '../composables/usePDF';

const router = useRouter();
// Definiendo las props
const props = defineProps({
  estudiante: {
    type: Object,
    required: false,
  },
  empresa: {
    type: Object,
    required: false,
  },
  asignacion: {
    type: Object,
    required: false,
  },
  registro: {
    type: Object,
    required: false,
  },
  clase: {
    type: Object,
    required: false,
  },
});

const globalListaDocumentoRegistros = getListaDocumentoRegistros();
const clases = ref([]);
const registros = ref([]);
const nombreEstudiante = ref('Cargando...');
const nombreEmpresa = ref('Cargando...');
const nombreProfesor = ref('Cargando...');
const crearPDF = ref(false);

onMounted(async () => {
  try {
    const storedValue = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(localStorage.getItem('crearPDF') === 'true');
      }, 100); // Simulando posible retraso
    });

    crearPDF.value = storedValue;
  } catch (error) {
    console.error('Error al obtener crearPDF del localStorage:', error);
  }

  const { fetchClases } = getClases();
  const result = await fetchClases();
  if (result) {
    clases.value = result.rows;
  }

  // Cargar el nombre del estudiante si existe una asignación
  if (props.asignacion?.id_estudiante) {
    nombreEstudiante.value = await obtenerNombreEstudiante(props.asignacion.id_estudiante);
  }

  // Cargar el nombre de la empresa si existe una asignación
  if (props.asignacion?.id_empresa) {
    nombreEmpresa.value = await obtenerNombreEmpresa(props.asignacion.id_empresa);
  }

  const { fetchRegistros } = getRegistros();
  const result2 = await fetchRegistros();
  if (result2) {
    registros.value = result2.rows;
  }

  // Cargar el nombre del profesor si existe un registro
  if (props.registro?.id_profesor) {
    nombreProfesor.value = await obtenerNombreProfesor(props.registro.id_profesor);
  }
  if(props.clase?.id_profesor){
    nombreProfesor.value = await obtenerNombreProfesor(props.clase.id_profesor);
  }

  // Cargar el nombre de la empresa si existe un registro
  if (props.registro?.id_empresa) {
    nombreEmpresa.value = await obtenerNombreEmpresa(props.registro.id_empresa);
  }

  // Obtener nombres de profesores para todas las empresas
  const { fetchEmpresas } = getEmpresas();
  const empresas = await fetchEmpresas();
  
  if(props.empresa?.profesor){
    nombreProfesor.value = await obtenerNombreProfesor(props.empresa.profesor);
  }
    
  
  // for (const empresa of empresas.rows) {
  //   const nombreProfesor = await obtenerNombreProfesor(empresa.profesor);
  //   console.log(nombreProfesor);
  //   nombresProfesores.value = await obtenerNombreProfesor(empresa.profesor);
  // }
    
});

const toggleRegistro = (id) => {
  if (globalListaDocumentoRegistros.value.includes(id)) {
    globalListaDocumentoRegistros.value = globalListaDocumentoRegistros.value.filter(item => item !== id);
  } else {
    globalListaDocumentoRegistros.value.push(id);
  }
};

const isChecked = (id) => globalListaDocumentoRegistros.value.includes(id);


function nombreDeClase(id) {
  const clase = clases.value.find((clase) => clase.id_clase === id);
  return clase ? clase.nombre_clase : 'No asignado';
}

// Función para obtener el nombre del estudiante usando getEstudiantes
async function obtenerNombreEstudiante(id) {
  try {
    const { fetchEstudiantes } = getEstudiantes();
    const estudiantes = await fetchEstudiantes();
    const estudiante = estudiantes.rows.find((est) => est.id_estudiante === id);
    return estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : 'Desconocido';
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    return 'Desconocido';
  }
}

// Función para obtener el nombre de la empresa usando getEmpresas
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

// Función para obtener el nombre del profesor usando getProfesores
async function obtenerNombreProfesor(id) {
  try {
    const { fetchProfesores } = getProfesores();
    const profesores = await fetchProfesores();
    const profesor = profesores.rows.find((prof) => prof.id_profesor === id);
    return profesor ? profesor.nombre : 'Desconocido';
  } catch (error) {
    console.error('Error al obtener profesores:', error);
    return 'Desconocido';
  }
}

function editarEstudiante(id) {
  localStorage.setItem('idEstudiante', id);
  router.push('/editarAlumno');
}

function eliminarEstudiante(id) {
  if (confirm('¿Estás seguro de eliminar este estudiante?')) {
    deleteEstudianteId(id);
    router.push('/estudiantes');
  }
}
function editarAsignacion(id) {
  localStorage.setItem('idAsignacion', id);
  router.push('/editarAsignacion');
}
function eliminarAsignacion(id) {
  if (confirm('¿Estás seguro de eliminar esta asignación?')) {
    deleteAsignacionId(id);
    router.push('/asignaciones');
  }
}

function editarEmpresa(id) {
  localStorage.setItem('idEmpresa', id);
  router.push('/editarEmpresa');
}

function crearRegistro(id) {
  localStorage.setItem('idEmpresa', id);
  router.push('/crearRegistro');
}

function editarClase(id) {
  localStorage.setItem('idClase', id);
  router.push('/editarClase');
}
function eliminarClase(id) {
  if (confirm('¿Estás seguro de eliminar esta clase?')) {
    deleteClaseId(id);
    router.push('/clases');
  }
}

function eliminarEmpresa(id) {
  if (confirm('¿Estás seguro de eliminar esta empresa?')) {
    deleteEmpresaId(id);
    router.push('/empresas');
  }
}
</script>

<template>
  <!-- <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
    <table class="min-w-full divide-y divide-gray-300 bg-white text-sm"> -->
      <!-- Cuerpo para Estudiantes -->
      <tbody class="divide-y divide-gray-200" v-if="estudiante && !empresa && !asignacion && !registro">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-4 py-3 text-gray-900 font-medium">{{ estudiante.id_estudiante }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.dni }}</td>
          <td class="px-4 py-3 text-gray-900">{{ estudiante.nombre }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.apellido }}</td>
          <td class="px-4 py-3 text-gray-700">{{ nombreDeClase(estudiante.id_clase) }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.fecha_nacimiento }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.direccion }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.email }}</td>
          <td class="px-4 py-3 text-gray-700">{{ estudiante.telefono }}</td>
          <td class="px-4 py-3 text-center">
            <span v-if="estudiante.tiene_vehiculo" class="inline-block w-6 h-6 bg-green-100 text-green-700 rounded-full">✓</span>
            <span v-else class="inline-block w-6 h-6 bg-red-100 text-red-700 rounded-full">✕</span>
          </td>
          <td class="px-4 py-3 flex justify-center gap-2">
            <button 
              @click="editarEstudiante(estudiante.id_estudiante)"
              class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </button>
            <button 
              @click="eliminarEstudiante(estudiante.id_estudiante)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>

      <!-- Cuerpo para Empresas -->
      <tbody class="divide-y divide-gray-200" v-if="empresa && !estudiante && !asignacion && !registro">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-4 py-3 text-gray-900 font-medium">{{ empresa.id_empresa }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.nombre }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.nombre_oficial }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.direccion_sede_central }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.poblacion }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.codigo_postal }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.provincia }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.telefono_empresa }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.actividad_principal }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.otras_actividades }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.descripcion_breve }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.interesado_en }}</td>
          <td class="px-4 py-3 text-gray-700">{{ empresa.estado_actual }}</td>
          <td class="px-4 py-3 text-gray-700">{{ nombreProfesor }}</td>
          
          <td class="px-4 py-3 flex justify-center gap-2">
            <button 
              @click="editarEmpresa(empresa.id_empresa)"
              class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </button>
            <button 
              @click="eliminarEmpresa(empresa.id_empresa)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
            <button 
              @click="crearRegistro(empresa.id_empresa)"
              class="p-2 text-green-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4v16a2 2 0 002 2h10a2 2 0 002-2V4m-2 0a2 2 0 00-2-2H7a2 2 0 00-2 2m3 4h8m-8 4h8m-8 4h5"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>

      <!-- Cuerpo para Asignaciones -->
      <tbody class="divide-y divide-gray-200" v-if="asignacion && !empresa && !estudiante && !registro">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-4 py-3 text-gray-900 font-medium">{{ asignacion.id_asignacion }}</td>
          <td class="px-4 py-3 text-gray-700">{{ nombreEstudiante }}</td>
          <td class="px-4 py-3 text-gray-700">{{ nombreEmpresa }}</td>
          <td class="px-4 py-3 text-gray-700">{{ asignacion.fecha_asignacion }}</td>
          <td class="px-4 py-3 text-gray-700">{{ asignacion.fecha_finalizacion }}</td>
          <td class="px-4 py-3 flex justify-center gap-2">
            <button 
              @click="editarAsignacion(asignacion.id_asignacion)"
              class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </button>
            <button 
              @click="eliminarAsignacion(asignacion.id_asignacion)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>

      <!-- Cuerpo para Registros -->
      <tbody class="divide-y divide-gray-200" v-if="registro && !empresa && !estudiante && !asignacion && !crearPDF">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-4 py-3 text-gray-900 font-medium">{{ registro.id_registros }}</td>
          <td class="px-4 py-3 text-gray-700">{{ nombreProfesor }}</td>
          <td class="px-4 py-3 text-gray-700">{{ nombreEmpresa }}</td>
          <td class="px-4 py-3 text-gray-700">{{ registro.fecha_asignacion }}</td>
          <td class="px-4 py-3 text-center">
            <span v-if="registro.llamada_registrada" class="inline-block w-6 h-6 bg-green-100 text-green-700 rounded-full">✓</span>
            <span v-else class="inline-block w-6 h-6 bg-red-100 text-red-700 rounded-full">✕</span>
          </td>
          <td class="px-4 py-3 text-center">
            <span v-if="registro.correo_registrado" class="inline-block w-6 h-6 bg-green-100 text-green-700 rounded-full">✓</span>
            <span v-else class="inline-block w-6 h-6 bg-red-100 text-red-700 rounded-full">✕</span>
          </td>
          <td class="px-4 py-3 text-center">
            <span v-if="registro.reunion_registrada" class="inline-block w-6 h-6 bg-green-100 text-green-700 rounded-full">✓</span>
            <span v-else class="inline-block w-6 h-6 bg-red-100 text-red-700 rounded-full">✕</span>
          </td>
          <td class="px-4 py-3 text-gray-700">{{ registro.observacion }}</td>
        </tr>
      </tbody>

      <!-- Cuerpo para Crear PDF -->
      <tbody class="divide-y divide-gray-200" v-if="crearPDF && registro && !empresa && !estudiante && !asignacion">
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-4 py-3 text-gray-900 font-medium">{{ registro.id_registros }}</td>
      <td class="px-4 py-3 text-gray-700">{{ nombreProfesor }}</td>
      <td class="px-4 py-3 text-gray-700">{{ nombreEmpresa }}</td>
      <td class="px-4 py-3 text-gray-700">{{ registro.fecha_asignacion }}</td>
      <td class="px-4 py-3 text-center">
        <span v-if="registro.llamada_registrada" class="inline-block w-6 h-6 bg-green-100 text-green-700 rounded-full">✓</span>
        <span v-else class="inline-block w-6 h-6 bg-red-100 text-red-700 rounded-full">✕</span>
      </td>
      <td class="px-4 py-3 text-center">
        <span v-if="registro.correo_registrado" class="inline-block w-6 h-6 bg-green-100 text-green-700 rounded-full">✓</span>
        <span v-else class="inline-block w-6 h-6 bg-red-100 text-red-700 rounded-full">✕</span>
      </td>
      <td class="px-4 py-3 text-center">
        <span v-if="registro.reunion_registrada" class="inline-block w-6 h-6 bg-green-100 text-green-700 rounded-full">✓</span>
        <span v-else class="inline-block w-6 h-6 bg-red-100 text-red-700 rounded-full">✕</span>
      </td>
      <td class="px-4 py-3 text-gray-700">{{ registro.observacion }}</td>
      <td class="px-4 py-3 text-gray-700">
        <div class="flex items-center gap-2">
          <input 
          type="checkbox" 
          :checked="isChecked(registro.id_registros)" 
          @change="toggleRegistro(registro.id_registros)"
          >
      </div>
      </td>
    </tr>
  </tbody>

  <tbody class="divide-y divide-gray-200" v-if="clase">
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-4 py-3 text-gray-900 font-medium">{{ clase.id_clase }}</td>
      <td class="px-4 py-3 text-gray-700">{{ clase.nombre_clase }}</td>
      <td class="px-4 py-3 text-gray-700">{{ nombreProfesor }}</td>
      <td class="px-4 py-3 flex justify-center gap-2">
        <button 
          @click="editarClase(clase.id_clase)"
          class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
          </svg>
        </button>
        <button 
          @click="eliminarClase(clase.id_clase)"
          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </td>
    </tr>
  </tbody>
    <!-- </table>
  </div> -->
</template>
