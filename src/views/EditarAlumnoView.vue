<script setup>
import { ref, onMounted, computed } from "vue";
import { getEstudiantesID, putEstudianteId } from "../composables/useDatabase"; 

const idEstudiante = localStorage.getItem('idEstudiante');

const form = ref({
  dni: "",
  nombre: "",
  apellido: "",
  curso: "",
  fecha: "",
  direccion: "",
  email: "",
  telefono: "",
  vehiculo: false,
});

const mensaje = ref(""); // Mensaje de éxito o error
const esEdicion = computed(() => !!idEstudiante); // Detecta si estamos en edición

// Cargar datos si estamos editando
onMounted(async () => {
  if (esEdicion.value) {
    try {
      const { fetchEstudiantesID } = getEstudiantesID(idEstudiante);
      const result = await fetchEstudiantesID();
      if (result?.rows.length > 0) {
        const estudiante = result.rows[0];

        

        // Llenar formulario con datos existentes
        form.value = {
          dni: estudiante.dni,
          nombre: estudiante.nombre,
          apellido: estudiante.apellido,
          curso: estudiante.id_clase,
          fecha: estudiante.fecha_nacimiento,
          direccion: estudiante.direccion,
          email: estudiante.email,
          telefono: estudiante.telefono,
          vehiculo: estudiante.tiene_vehiculo === 1,
        };
      }
    } catch (error) {
      console.error("Error al cargar estudiante:", error);
    }
  }
});

// Guardar cambios
const guardarEstudiante = async () => {
  try {
    if (esEdicion.value) {
      await putEstudianteId(
        idEstudiante,
        form.value.dni,
        form.value.nombre,
        form.value.apellido,
        form.value.curso,
        form.value.fecha,
        form.value.direccion,
        form.value.email,
        form.value.telefono,
        form.value.vehiculo
      );
      mensaje.value = "Estudiante actualizado con éxito.";
    } else {
      // Aquí puedes reutilizar la función de crear si no se está editando.
      mensaje.value = "Funcionalidad de creación no implementada en este componente.";
    }
  } catch (error) {
    console.error("Error al guardar estudiante:", error);
    mensaje.value = "Hubo un error al guardar el estudiante.";
  }
};
</script>

<template>
  <section class="max-h-screen flex items-center">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
        {{ esEdicion ? "Editar Estudiante" : "Crear Estudiante" }}
      </h2>

      <div class="mx-auto max-w-lg">
        <form @submit.prevent="guardarEstudiante" class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
          <div class="space-y-4">
            <div>
              <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre*</label>
              <input v-model="form.nombre" id="nombre" type="text" required class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" placeholder="Nombre completo" />
            </div>

            <div>
              <label for="apellidos" class="block text-sm font-medium text-gray-700">Apellidos*</label>
              <input v-model="form.apellido" id="apellidos" type="text" required class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" placeholder="Apellidos" />
            </div>

            <div>
              <label for="dni" class="block text-sm font-medium text-gray-700">DNI*</label>
              <input v-model="form.dni" id="dni" type="text" required :disabled="esEdicion" class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm bg-gray-100" placeholder="DNI/NIE" />
            </div>
          </div>

          <div class="pt-2 mt-6 border-t border-gray-200">
            <h3 class="text-center text-lg font-medium text-gray-700 mb-4">Datos Opcionales</h3>

            <div class="space-y-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input v-model="form.telefono" id="telefono" type="tel" class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" placeholder="Teléfono" />
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input v-model="form.email" id="email" type="email" class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" placeholder="Correo electrónico" />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label for="clase" class="block text-sm font-medium text-gray-700">Clase/Grupo</label>
                  <input v-model="form.curso" id="clase" type="text" class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" placeholder="Clase/Grupo" />
                </div>

                <div>
                  <label for="fecha_nacimiento" class="block text-sm font-medium text-gray-700">Fecha Nacimiento</label>
                  <input v-model="form.fecha" id="fecha_nacimiento" type="date" class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" />
                </div>
              </div>

              <div>
                <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
                <input v-model="form.direccion" id="direccion" type="text" class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" placeholder="Dirección completa" />
              </div>

              <div class="flex items-center gap-2">
                <input v-model="form.vehiculo" id="vehiculo" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500" />
                <label for="vehiculo" class="text-sm text-gray-600"> ¿Tiene vehículo propio? </label>
              </div>
            </div>
          </div>

          <button type="submit" class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-4 text-sm font-medium text-white shadow-sm hover:opacity-90">
            {{ esEdicion ? "Actualizar Estudiante" : "Registrar Estudiante" }}
          </button>

          <p v-if="mensaje" class="mt-4 text-center text-sm font-medium" :class="mensaje.includes('error') ? 'text-red-500' : 'text-green-500'">
            {{ mensaje }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
