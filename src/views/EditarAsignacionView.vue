<script setup>
import { ref, onMounted, computed } from "vue";
import { getAsignacionesID, putAsignacionId, getEstudiantes, getEmpresas } from "../composables/useDatabase";

const idAsignacion = localStorage.getItem('idAsignacion');

const form = ref({
    id_estudiante: "",
    id_empresa: "",
    fecha_asignacion: "",
    fecha_finalizacion: "",
});

const mensaje = ref(""); // Mensaje de éxito o error
const esEdicion = computed(() => !!idAsignacion); // Detecta si estamos en edición
const empresas = ref([]);
const estudiantes = ref([]);

onMounted(async () => {
    // Cargar estudiantes
    const { fetchEstudiantes } = getEstudiantes();
    const resultEstudiantes = await fetchEstudiantes();
    if (resultEstudiantes && resultEstudiantes.rows) {
        estudiantes.value = resultEstudiantes.rows;
    }

    // Cargar empresas
    const { fetchEmpresas } = getEmpresas();
    const resultEmpresas = await fetchEmpresas();
    if (resultEmpresas && resultEmpresas.rows) {
        empresas.value = resultEmpresas.rows;
    }

    if (esEdicion.value) {
        try {
            const { fetchAsignacionesID } = getAsignacionesID(idAsignacion);
            const result = await fetchAsignacionesID();
            if (result?.rows.length > 0) {
                const asignacion = result.rows[0];
                form.value = {
                    id_estudiante: asignacion.id_estudiante,
                    id_empresa: asignacion.id_empresa,
                    fecha_asignacion: asignacion.fecha_asignacion,
                    fecha_finalizacion: asignacion.fecha_finalizacion,
                };
            }
        } catch (error) {
            console.error("Error al cargar asignacion:", error);
        }
    }
});

const guardarasignacion = async () => {
    try {
        if (esEdicion.value) {
            await putAsignacionId(
                idAsignacion,
                form.value.id_estudiante,
                form.value.id_empresa,
                form.value.fecha_asignacion,
                form.value.fecha_finalizacion
            );
            mensaje.value = "asignacion actualizada con éxito.";
        } else {
            mensaje.value = "Funcionalidad de creación no implementada en este componente.";
        }
    } catch (error) {
        console.error("Error al guardar asignacion:", error);
        mensaje.value = "Hubo un error al guardar la asignacion.";
    }
};
</script>

<template>
    <section class="max-h-screen mt-32 mb-32 flex items-center">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <h2
                class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
                {{ esEdicion ? "Editar asignacion" : "Crear asignacion" }}
            </h2>

            <div class="mx-auto max-w-lg">
                <form @submit.prevent="guardarasignacion"
                    class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">



                        <div>
                            <label for="id_estudiante" class="block text-sm font-medium text-gray-700">estudiante
                                Asociado</label>
                            <select v-model="form.id_estudiante" id="id_estudiante"
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm">
                                <option v-if="!form.id_estudiante" value="">Seleccione un estudiante</option>
                                <option v-for="estudiante in estudiantes" :key="estudiante.id_estudiante"
                                    :value="estudiante.id_estudiante"
                                    :selected="estudiante.id_estudiante === form.id_estudiante">
                                    {{ estudiante.nombre +  " " + estudiante.apellido }}
                                </option>
                            </select>
                        </div>
                    <div class="pt-6 mt-6 border-t border-gray-200">

                        <div>
                            <label for="id_empresa" class="block text-sm font-medium text-gray-700">empresa
                                Asociado</label>
                            <select v-model="form.id_empresa" id="id_empresa"
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm">
                                <option v-if="!form.id_empresa" value="">Seleccione un empresa</option>
                                <option v-for="empresa in empresas" :key="empresa.id_empresa"
                                    :value="empresa.id_empresa"
                                    :selected="empresa.id_empresa === form.id_empresa">
                                    {{ empresa.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="pt-6 mt-6 border-t border-gray-200">
                        <div>
                            <label for="fecha_asignacion" class="block text-sm font-medium text-gray-700">Fecha de
                                Asignación*</label>
                            <input v-model="form.fecha_asignacion" id="fecha_asignacion" type="date" required
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" />
                        </div>
                    </div>
                    <div class="pt-6 mt-6 border-t border-gray-200">
                        <div>
                            <label for="fecha_finalizacion" class="block text-sm font-medium text-gray-700">Fecha de
                                Finalización*</label>
                            <input v-model="form.fecha_finalizacion" id="fecha_finalizacion" type="date" required
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" />
                        </div>
                    </div>

                    <button type="submit"
                        class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-6 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400">
                        {{ esEdicion ? "Actualizar Asignación" : "Registrar Asignación" }}
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
