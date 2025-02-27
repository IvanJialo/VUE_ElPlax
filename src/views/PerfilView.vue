<script setup>
import { ref, onMounted, computed } from "vue";
import { getProfesorID, putProfesorId, getClases } from "../composables/useDatabase";

const idProfesor = localStorage.getItem('idProfesor');

const form = ref({
    nombre: "",
    apellido: "",
    email: "",
    fecha_nacimiento: "",
    contrasena: "",
    id_clase: ""
});

const mensaje = ref(""); // Mensaje de éxito o error
const esEdicion = computed(() => !!idProfesor); // Detecta si estamos en edición
const clases = ref([]);

onMounted(async () => {
    // Cargar clases
    const { fetchClases } = getClases();
    const resultClases = await fetchClases();
    if (resultClases && resultClases.rows) {
        clases.value = resultClases.rows;
    }

    if (esEdicion.value) {
        try {
            const { fetchProfesorID } = getProfesorID(idProfesor);
            const result = await fetchProfesorID();
            if (result?.rows.length > 0) {
                const profesor = result.rows[0];
                form.value = {
                    nombrePng: profesor.nombre,
                    nombre: profesor.nombre,
                    apellido: profesor.apellido,
                    email: profesor.email,
                    fecha_nacimiento: profesor.fecha_nacimiento,
                    contrasena: profesor.contrasena,
                    id_clase: profesor.id_clase
                };
            }
        } catch (error) {
            console.error("Error al cargar Profesor:", error);
        }
    }
});


const computedSrc = computed(() => {
    if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(`imagen-${form.value.nombre}`) || `/${form.value.nombrePng}.png`;
    }
    return `/${form.value.nombrePng}.png`; // Valor por defecto si localStorage no está disponible
});

const guardarProfesor = async () => {
    try {
        if (esEdicion.value) {
            await putProfesorId(
                idProfesor,
                form.value.nombre,
                form.value.apellido,
                form.value.email,
                form.value.fecha_nacimiento,
                form.value.contrasena,
                form.value.id_clase
            );
            mensaje.value = "profesor actualizada con éxito.";
        } else {
            mensaje.value = "Funcionalidad de creación no implementada en este componente.";
        }
    } catch (error) {
        console.error("Error al guardar profesor:", error);
        mensaje.value = "Hubo un error al guardar la profesor.";
    }
};

// Función para eliminar la imagen si existe
const eliminarPng = (nombre) => {
    const imgPath = `/${nombre}.png`;
    if (localStorage.getItem(`imagen-${nombre}`)) {
        localStorage.removeItem(`imagen-${nombre}`);
        console.log(`Imagen ${nombre}.png eliminada de localStorage`);
    } else {
        console.log(`La imagen ${nombre}.png no existe en localStorage`);
    }

    // Crear una imagen temporal para verificar si existe
    const img = new Image();
    img.src = imgPath;

    img.onload = () => {
        form.value.nombrePng = "undefine"; // Cambia la imagen a "undefine.png"
        mensaje.value = "Imagen eliminada visualmente.";
    };

    img.onerror = () => {
        mensaje.value = "La imagen no existía.";
    };
};


// Función para editar imagen (eliminar y subir una nueva)
const editarPng = (nombre) => {
    // Simular la eliminación llamando a eliminarPng primero
    eliminarPng(nombre);

    // Crear input de selección de archivo
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png";
    input.click();

    input.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            // Guardamos la nueva imagen en localStorage para simular un cambio
            localStorage.setItem(`imagen-${nombre}`, reader.result);
            mensaje.value = "Imagen actualizada visualmente.";
        };
    };
};
</script>

<template>
    <section class="max-h-screen mt-32 mb-32 flex items-center">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <h2
                class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
                {{ esEdicion ? "Perfil Docente" : "Perfil Docente" }}
            </h2>

            <!-- Imagen del Profesor -->
            <div class="flex justify-center mb-6">
                <img :src="computedSrc" alt="Foto del Profesor" class="w-32 h-32 rounded-full shadow-lg object-cover"
                    @error="(e) => e.target.src = '/undefine.png'">

            </div>

            <td class="px-4  flex justify-center gap-2">
                <button @click="editarPng(form.nombre)"
                    class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
                <button @click="eliminarPng(form.nombre)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </td>
            <div class="mx-auto max-w-lg">
                <form @submit.prevent="guardarProfesor"
                    class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
                    <div class="space-y-4">
                        <div>
                            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
                            <input v-model="form.nombre" type="text" name="nombre" id="nombre" required
                                class="block w-full px-3 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none">
                        </div>

                        <div>
                            <label for="apellido" class="block text-sm font-medium text-gray-700">Apellido</label>
                            <input v-model="form.apellido" type="text" name="apellido" id="apellido" required
                                class="block w-full px-3 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none">
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input v-model="form.email" type="email" name="email" id="email" required
                                class="block w-full px-3 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none">
                        </div>

                        <div>
                            <label for="fecha_nacimiento" class="block text-sm font-medium text-gray-700">Fecha de
                                Nacimiento</label>
                            <input v-model="form.fecha_nacimiento" type="date" name="fecha_nacimiento"
                                id="fecha_nacimiento" required
                                class="block w-full px-3 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none">
                        </div>

                        <div>
                            <label for="contrasena" class="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input v-model="form.contrasena" type="text" name="contrasena" id="contrasena" required
                                class="block w-full px-3 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none">
                        </div>

                        <div>
                            <label for="id_clase" class="block text-sm font-medium text-gray-700">Clase Asociada</label>
                            <select v-model="form.id_clase" id="id_clase" name="id_clase" required
                                class="block w-full px-3 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none">
                                <option value="" disabled>Seleccione una clase</option>
                                <option v-for="clase in clases" :key="clase.id_clase" :value="clase.id_clase">
                                    {{ clase.nombre_clase }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <button type="submit"
                        class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-6 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400">
                        {{ esEdicion ? "Actualizar Perfil" : "Registrar Perfil" }}
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
