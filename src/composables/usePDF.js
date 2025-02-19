// src/composables/usePDF.js
import { ref } from "vue";

// Estado reactivo para la lista de registros
const listaDocumentoRegistros = ref([]);

// Función para guardar la lista de registros
export function GuardarListado(listado) {
  listaDocumentoRegistros.value = listado;
}

// Función opcional para acceder al estado
export function getListaDocumentoRegistros() {
  return listaDocumentoRegistros;
}
