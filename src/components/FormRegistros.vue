<script setup>
import { ref } from "vue";
import { postInsertarRegistros } from "../composables/useDatabase";

const idEmpresa = localStorage.getItem('idEmpresa');
const idProfesor = localStorage.getItem('idProfesor');

// Definimos los datos del formulario como referencias reactivas
const form = ref({
  llamada_registrada: false,    // Checkbox: Obligatorio de forma opcional
  correo_registrado: false,     // Checkbox: Opcional
  reunion_registrada: false,    // Checkbox: Opcional
  observacion: "",              // Texto: Opcional
  fecha_asignacion: "",         // Fecha: Obligatoria
  id_empresa: idEmpresa,               // Texto (o número): Obligatoria
  id_profesor: idProfesor              // Texto (o número): Obligatoria
});

const mensaje = ref(""); // Mensaje de éxito o error

const enviarRegistro = async () => {
  try {
    // Validación: Al menos, fecha_asignacion, id_empresa e id_profesor son obligatorios
    if (!form.value.fecha_asignacion || !form.value.id_empresa || !form.value.id_profesor) {
      mensaje.value = "error: Fecha de asignación, ID de la empresa y ID del profesor son obligatorios";
      return;
    }

    await postInsertarRegistros(
      form.value.llamada_registrada,
      form.value.correo_registrado,
      form.value.reunion_registrada,
      form.value.observacion,
      form.value.fecha_asignacion,
      form.value.id_empresa,
      form.value.id_profesor
    );
    
    mensaje.value = "¡Registro insertado con éxito!";
    limpiarFormulario();
    
  } catch (error) {
    console.error("Error al insertar registro:", error);
    mensaje.value = "Error al insertar registro";
  }
};

const limpiarFormulario = () => {
  form.value = {
    llamada_registrada: false,
    correo_registrado: false,
    reunion_registrada: false,
    observacion: "",
    fecha_asignacion: "",
  };
};
</script>

<template>
  <section class="max-h-screen flex items-center">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
        Registro de Registros
      </h2>

      <div class="mx-auto max-w-lg">
        <form @submit.prevent="enviarRegistro" class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
          <!-- Datos obligatorios -->
          <div class="space-y-4">
            <div>
              <label for="fecha_asignacion" class="block text-sm font-medium text-gray-700">Fecha de Asignación*</label>
              <input
                v-model="form.fecha_asignacion"
                id="fecha_asignacion"
                type="date"
                required
                class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm"
              />
            </div>
          </div>

          <!-- Sección de datos opcionales -->
          <div class="pt-6 mt-6 border-t border-gray-200">
            
            <div class="space-y-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <!-- Checkbox para llamada registrada -->
                <div class="flex items-center gap-2">
                  <input
                    v-model="form.llamada_registrada"
                    id="llamada_registrada"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                  />
                  <label for="llamada_registrada" class="text-sm text-gray-600">Llamada registrada</label>
                </div>
                <!-- Checkbox para correo registrado -->
                <div class="flex items-center gap-2">
                  <input
                    v-model="form.correo_registrado"
                    id="correo_registrado"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                  />
                  <label for="correo_registrado" class="text-sm text-gray-600">Correo registrado</label>
                </div>
                <!-- Checkbox para reunión registrada -->
                <div class="flex items-center gap-2">
                  <input
                    v-model="form.reunion_registrada"
                    id="reunion_registrada"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                  />
                  <label for="reunion_registrada" class="text-sm text-gray-600">Reunión registrada</label>
                </div>
              </div>

              <div>
                <label for="observacion" class="block text-sm font-medium text-gray-700">Observaciones</label>
                <textarea
                  v-model="form.observacion"
                  id="observacion"
                  class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm"
                  placeholder="Notas adicionales..."
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-6 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Registrar Registro
          </button>

          <p v-if="mensaje" class="mt-4 text-center text-sm font-medium" :class="mensaje.includes('error') ? 'text-red-500' : 'text-green-500'">
            {{ mensaje }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
