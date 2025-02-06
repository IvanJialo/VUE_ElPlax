<script setup>
import { ref, onMounted, computed } from "vue";
import { getEmpresasID, putEmpresaId } from "../composables/useDatabase";

const idEmpresa = localStorage.getItem('idEmpresa');

const form = ref({
  cif: "",
  nombre: "",
  telefono: "",
  email: "",
  direccion: "",
  capacidad: "",
  observacion: "",
});

const mensaje = ref(""); // Mensaje de éxito o error
const esEdicion = computed(() => !!idEmpresa); // Detecta si estamos en edición

onMounted(async () => {
  if (esEdicion.value) {
    try {
      const { fetchEmpresasID } = getEmpresasID(idEmpresa);
      const result = await fetchEmpresasID();
      if (result?.rows.length > 0) {
        const empresa = result.rows[0];
        form.value = {
          cif: empresa.CIF,
          nombre: empresa.nombre_empresa,
          telefono: empresa.telefono,
          email: empresa.email,
          direccion: empresa.direccion,
          capacidad: empresa.capacidad,
          observacion: empresa.observacion,
        };
      }
    } catch (error) {
      console.error("Error al cargar empresa:", error);
    }
  }
});

const guardarEmpresa = async () => {
  try {
    if (esEdicion.value) {
      await putEmpresaId(
        idEmpresa,
        form.value.cif,
        form.value.nombre,
        form.value.telefono,
        form.value.email,
        form.value.direccion,
        form.value.capacidad,
        form.value.observacion
      );
      mensaje.value = "Empresa actualizada con éxito.";
    } else {
      mensaje.value = "Funcionalidad de creación no implementada en este componente.";
    }
  } catch (error) {
    console.error("Error al guardar empresa:", error);
    mensaje.value = "Hubo un error al guardar la empresa.";
  }
};
</script>

<template>
  <section class="max-h-screen flex items-center">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
        {{ esEdicion ? "Editar Empresa" : "Crear Empresa" }}
      </h2>

      <div class="mx-auto max-w-lg">
        <form @submit.prevent="guardarEmpresa" class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
          <div class="space-y-4">
            <div>
              <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre de la empresa*</label>
              <input v-model="form.nombre" id="nombre" type="text" required class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Ej: Tech Solutions S.L." />
            </div>
          </div>

          <div class="pt-6 mt-6 border-t border-gray-200">
            <h3 class="text-center text-lg font-medium text-gray-700 mb-4">Datos Opcionales</h3>
            
            <div class="space-y-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label for="cif" class="block text-sm font-medium text-gray-700">CIF</label>
                  <input v-model="form.cif" id="cif" type="text" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Código de identificación fiscal" />
                </div>

                <div>
                  <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input v-model="form.telefono" id="telefono" type="tel" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Número de contacto" />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input v-model="form.email" id="email" type="email" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Correo electrónico" />
                </div>

                <div>
                  <label for="capacidad" class="block text-sm font-medium text-gray-700">Capacidad</label>
                  <input v-model="form.capacidad" id="capacidad" type="number" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Nº máximo de alumnos" />
                </div>
              </div>

              <div>
                <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
                <input v-model="form.direccion" id="direccion" type="text" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Dirección completa" />
              </div>

              <div>
                <label for="observacion" class="block text-sm font-medium text-gray-700">Observaciones</label>
                <textarea v-model="form.observacion" id="observacion" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Notas adicionales..." rows="4"></textarea>
              </div>
            </div>
          </div>

          <button type="submit" class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-6 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400">
            {{ esEdicion ? "Actualizar Empresa" : "Registrar Empresa" }}
          </button>

          <p v-if="mensaje" class="mt-4 text-center text-sm font-medium" :class="mensaje.includes('error') ? 'text-red-500' : 'text-green-500'">
            {{ mensaje }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
