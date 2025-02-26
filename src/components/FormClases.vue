<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { postInsertarClases, getProfesores } from "../composables/useDatabase"; // Asegúrate de importar correctamente la función

// Definimos los datos del formulario como referencias reactivas
const form = ref({
    nombre_clase: "",
    id_profesor: ""
});

const profesores = ref([]);

onMounted(async () => {
    const { fetchProfesores } = getProfesores();
  const result = await fetchProfesores();
  if (result) {
    profesores.value = result.rows;
  }
});


const mensaje = ref(""); // Mensaje de éxito o error

// Función para enviar el formulario
const enviarClase = async () => {
    try {
        await postInsertarClases(
            form.value.nombre_clase,
            form.value.id_profesor
        );
        mensaje.value = "Clase registrado con éxito.";
        limpiarFormulario();
    } catch (error) {
        console.error("Error al insertar Clase:", error);
        mensaje.value = "Hubo un error al registrar el Clase.";
    }
};

// Función para limpiar el formulario después de enviarlo
const limpiarFormulario = () => {
    form.value = {
        nombre_clase: "",
        id_profesor: ""
    };
};
</script>
<template>
    <section class="max-h-screen flex items-center">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <h2
                class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
                Creación de Clase
            </h2>

            <div class="mx-auto max-w-lg">
                <form @submit.prevent="enviarClase" class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
                    <!-- Campos obligatorios -->
                    <div class="space-y-4">
                        <div>
                            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre clase</label>
                            <input v-model="form.nombre_clase" id="nombre" type="text" required
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm"
                                placeholder="Nombre" />
                        </div>

                        <div>
                            <label for="apellidos" class="block text-sm font-medium text-gray-700">Profesor
                                asignado</label>
                            <select v-model="form.id_profesor" id="apellidos" required
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm">
                                <option value="" disabled>Seleccione un profesor</option>
                                <option v-for="profesor in profesores" :key="profesor.id_profesor" :value="profesor.id_profesor">
                                    {{ profesor.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>


                    <!-- Botón de Enviar -->
                    <button type="submit"
                        class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-4 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400">
                        Registrar Clase
                    </button>

                    <!-- Mensaje de éxito o error -->
                    <p v-if="mensaje" class="mt-4 text-center text-sm font-medium"
                        :class="mensaje.includes('error') ? 'text-red-500' : 'text-green-500'">
                        {{ mensaje }}
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>
