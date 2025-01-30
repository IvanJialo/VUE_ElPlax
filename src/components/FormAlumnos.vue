<script setup>
// Lógica de Vue (si necesitas manejar los datos, agrega aquí el código reactivo)
</script>

<template>
    <section class="max-h-screen flex items-center">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <h2 class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
                Creación de Alumnos
            </h2>

            <div class="mx-auto max-w-lg">

                <form action="#" class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
                    <!-- Campos obligatorios -->
                    <div class="space-y-4">
                        <div>
                            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre*</label>
                            <input
                                id="nombre"
                                type="text"
                                required
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm"
                                placeholder="Nombre completo"
                            />
                        </div>

                        <div>
                            <label for="apellidos" class="block text-sm font-medium text-gray-700">Apellidos*</label>
                            <input
                                id="apellidos"
                                type="text"
                                required
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm"
                                placeholder="Apellidos"
                            />
                        </div>

                        <div>
                            <label for="dni" class="block text-sm font-medium text-gray-700">DNI*</label>
                            <input
                                id="dni"
                                type="text"
                                required
                                class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm"
                                placeholder="DNI/NIE"
                            />
                        </div>
                    </div>

                    <!-- Sección de datos opcionales -->
                    <div class="pt-2 mt-6 border-t border-gray-200">
                        <h3 class="text-center text-lg font-medium text-gray-700 mb-4">Datos Opcionales</h3>
                        
                        <div class="space-y-4">
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
                                    <input
                                        id="telefono"
                                        type="tel"
                                        class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm"
                                        placeholder="Teléfono"
                                    />
                                </div>

                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm"
                                        placeholder="Correo electrónico"
                                    />
                                </div>
                            </div>

                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label for="clase" class="block text-sm font-medium text-gray-700">Clase/Grupo</label>
                                    <input
                                        id="clase"
                                        type="text"
                                        class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm"
                                        placeholder="Clase/Grupo"
                                    />
                                </div>

                                <div>
                                    <label for="fecha_nacimiento" class="block text-sm font-medium text-gray-700">Fecha Nacimiento</label>
                                    <input
                                        id="fecha_nacimiento"
                                        type="date"
                                        class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
                                <input
                                    id="direccion"
                                    type="text"
                                    class="w-full rounded-lg border-gray-200 focus:border-purple-500 p-3 text-sm shadow-sm"
                                    placeholder="Dirección completa"
                                />
                            </div>

                            <div class="flex items-center gap-2">
                                <input 
                                    id="vehiculo" 
                                    type="checkbox" 
                                    class="h-4 w-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                />
                                <label for="vehiculo" class="text-sm text-gray-600">
                                    ¿Tiene vehículo propio?
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Botón de Enviar -->
                    <button
                        type="submit"
                        class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-4 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        Registrar Alumno
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>