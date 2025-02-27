<script setup>
import { ref, onMounted, computed } from "vue";
import { getClaseID, putClaseId, getProfesores } from "../composables/useDatabase";

const idClase = localStorage.getItem('idClase');

const form = ref({
    nombre_clase: "",
    id_profesor: "",
});

const mensaje = ref(""); // Mensaje de éxito o error
const esEdicion = computed(() => !!idClase); // Detecta si estamos en edición
const profesores = ref([]);

onMounted(async () => {
    // Cargar profesores
    const { fetchProfesores } = getProfesores();
    const resultProfesores = await fetchProfesores();
    if (resultProfesores && resultProfesores.rows) {
        profesores.value = resultProfesores.rows;
    }

    if (esEdicion.value) {
        try {
            const { fetchClaseID } = getClaseID(idClase);
            const result = await fetchClaseID();
            if (result?.rows.length > 0) {
                const clase = result.rows[0];
                form.value = {
                    nombre_clase: clase.nombre_clase,
                    id_profesor: clase.id_profesor,
                };
            }
        } catch (error) {
            console.error("Error al cargar clase:", error);
        }
    }
});

const guardarClase = async () => {
    try {
        if (esEdicion.value) {
            await putClaseId(
                idClase,
                form.value.nombre_clase,
                form.value.id_profesor
            );
            mensaje.value = "clase actualizada con éxito.";
        } else {
            mensaje.value = "Funcionalidad de creación no implementada en este componente.";
        }
    } catch (error) {
        console.error("Error al guardar clase:", error);
        mensaje.value = "Hubo un error al guardar la clase.";
    }
};
</script>

<template>
    <section class="max-h-screen mt-32 mb-32 flex items-center">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <h2
                class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
                {{ esEdicion ? "Editar Clase" : "Crear Clase" }}
            </h2>

            <div class="mx-auto max-w-lg">
                <form @submit.prevent="guardarClase" class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
                    <div class="space-y-4">
                        <div>
                            <label for="nombre_clase" class="block text-sm font-medium text-gray-700">Nombre de la
                                clase*</label>
                            <input v-model="form.nombre_clase" id="nombre_clase" type="text" required
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm"
                                placeholder="Ej: Tech Solutions S.L." />
                        </div>
                    </div>

                    <div class="pt-6 mt-6 border-t border-gray-200">

                        <div>
                            <label for="id_profesor" class="block text-sm font-medium text-gray-700">Profesor
                                Asociado</label>
                            <select v-model="form.id_profesor" id="id_profesor"
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm">
                                <option v-if="!form.id_profesor" value="">Seleccione un profesor</option>
                                <option v-for="profesor in profesores" :key="profesor.id_profesor"
                                    :value="profesor.id_profesor" :selected="profesor.id_profesor === form.id_profesor">
                                    {{ profesor.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <button type="submit"
                        class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-6 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400">
                        {{ esEdicion ? "Actualizar Clase" : "Registrar Clase" }}
                    </button>

                    <p v-if="mensaje" class="mt-4 text-center text-sm font-medium"
                        :class="mensaje.includes('error') ? 'text-red-500' : 'text-green-500'">
                        {{ mensaje }}
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>
