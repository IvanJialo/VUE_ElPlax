<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { postInsertarProfesores, getClases } from "../composables/useDatabase"; // Asegúrate de importar correctamente la función

// Definimos los datos del formulario como referencias reactivas
const form = ref({
  nombre: "",
  apellido: "",
  email: "",
  fecha_nacimiento: "",
  contrasena: "",
  id_clase: "",
});

const mensaje = ref(""); // Mensaje de éxito o error

// Cargar clases
const clases = ref([]);
onMounted(async () => {
  const { fetchClases } = getClases();
  const result = await fetchClases();
  if (result) {
    clases.value = result.rows;
  }
});
// Función para enviar el formulario
const enviarProfesor = async () => {
  try {
    await postInsertarProfesores(
      form.value.nombre,
      form.value.apellido,
        form.value.email,
        form.value.fecha_nacimiento,
        form.value.contrasena,
        form.value.id_clase
    );
    mensaje.value = "Profesor registrado con éxito.";
    limpiarFormulario();
  } catch (error) {
    console.error("Error al insertar Profesor:", error);
    mensaje.value = "Hubo un error al registrar el Profesor.";
  }
};

// Función para limpiar el formulario después de enviarlo
const limpiarFormulario = () => {
  form.value = {
    nombre: "",
    apellido: "",
    email: "",
    fecha_nacimiento: "",
    contrasena: "",
    id_clase: "",
  };
};
</script>
<template>
  <section class="max-h-screen flex items-center">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
        Creación de Profesores
      </h2>

      <div class="mx-auto max-w-lg">
        <form @submit.prevent="enviarProfesor" class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
          <!-- Campos obligatorios -->
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
              <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico*</label>
              <input v-model="form.email" id="email" type="email" required class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" placeholder="Correo Electrónico" />
            </div>

            <div>
              <label for="fecha_nacimiento" class="block text-sm font-medium text-gray-700">Fecha de Nacimiento*</label>
              <input v-model="form.fecha_nacimiento" id="fecha_nacimiento" type="date" required class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" />
            </div>

            <div>
              <label for="contrasena" class="block text-sm font-medium text-gray-700">Contraseña*</label>
              <input v-model="form.contrasena" id="contrasena" type="password" required class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" placeholder="Contraseña" />
            </div>

            <div>
              <label for="id_clase" class="block text-sm font-medium text-gray-700">Clase*</label>
              <select v-model="form.id_clase" id="id_clase" required class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm">
                <option v-if="!form.id_clase" value="">Seleccione una clase</option>
                <option v-for="clase in clases" :key="clase.id_clase" :value="clase.id_clase">{{ clase.nombre_clase }}</option>
              </select>
            </div>
          </div>

          <!-- Botón de Enviar -->
          <button type="submit" class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-4 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400">
            Registrar Profesor
          </button>

          <!-- Mensaje de éxito o error -->
          <p v-if="mensaje" class="mt-4 text-center text-sm font-medium" :class="mensaje.includes('error') ? 'text-red-500' : 'text-green-500'">
            {{ mensaje }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
