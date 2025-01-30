<script setup>
import { ref, computed } from 'vue'

// Datos de ejemplo (deberías cargarlos desde tu API)
const alumnos = ref([
    { id: 1, nombre: 'Juan Pérez García' },
    { id: 2, nombre: 'María López Sánchez' },
    { id: 3, nombre: 'Carlos Martínez Ruiz' }
])

const empresas = ref([
    { id: 1, nombre: 'Tech Solutions S.L.' },
    { id: 2, nombre: 'Digital Innovators' },
    { id: 3, nombre: 'Software Factory' }
])

// Reactividad para los desplegables
const busquedaAlumno = ref('')
const busquedaEmpresa = ref('')
const showAlumnos = ref(false)
const showEmpresas = ref(false)

// Filtrado computado
const alumnosFiltrados = computed(() => {
    return alumnos.value.filter(alumno =>
        alumno.nombre.toLowerCase().includes(busquedaAlumno.value.toLowerCase())
    )
})

const empresasFiltradas = computed(() => {
    return empresas.value.filter(empresa =>
        empresa.nombre.toLowerCase().includes(busquedaEmpresa.value.toLowerCase())
    )
})
</script>

<template>
    <section class="max-h-screen flex items-center">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <h2
                class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
                Asignación de Prácticas
            </h2>

            <div class="mx-auto max-w-lg">
                <form class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
                    <!-- Campo Alumno -->
                    <div class="space-y-4">
                        <div class="relative">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Alumno*</label>
                            <input v-model="busquedaAlumno" @focus="showAlumnos = true"
                                @blur="setTimeout(() => showAlumnos = false, 150)" type="text"
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm"
                                placeholder="Buscar alumno..." />

                            <div v-show="showAlumnos && alumnosFiltrados.length"
                                class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                                <div v-for="alumno in alumnosFiltrados" :key="alumno.id"
                                    @mousedown="busquedaAlumno = alumno.nombre; showAlumnos = false"
                                    class="p-3 hover:bg-gray-50 cursor-pointer text-sm">
                                    {{ alumno.nombre }}
                                </div>
                            </div>
                        </div>

                        <!-- Campo Empresa -->
                        <div class="relative">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Empresa*</label>
                            <input v-model="busquedaEmpresa" @focus="showEmpresas = true"
                                @blur="setTimeout(() => showEmpresas = false, 150)" type="text"
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm"
                                placeholder="Buscar empresa..." />

                            <div v-show="showEmpresas && empresasFiltradas.length"
                                class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                                <div v-for="empresa in empresasFiltradas" :key="empresa.id"
                                    @mousedown="busquedaEmpresa = empresa.nombre; showEmpresas = false"
                                    class="p-3 hover:bg-gray-50 cursor-pointer text-sm">
                                    {{ empresa.nombre }}
                                </div>
                            </div>
                        </div>

                        <!-- Fechas -->
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Fecha de inicio*</label>
                                <input type="date" required
                                    class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700">Fecha de fin*</label>
                                <input type="date" required
                                    class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm" />
                            </div>
                        </div>
                    </div>

                    <!-- Botón de Enviar -->
                    <button type="submit"
                        class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-6 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400">
                        Asignar Prácticas
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>