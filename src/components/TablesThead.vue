<script setup>
import { defineProps } from 'vue';

// Recibiendo las props
defineProps({
  estudiante: {
    type: Boolean,
    default: false, // Valor por defecto
  },
  empresa: {
    type: Boolean,
    default: false, // Valor por defecto
  },
  asignacion: {
    type: Boolean,
    default: false, // Valor por defecto
  },
});
</script>

<template>
  <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4">
    <table class="min-w-full divide-y divide-gray-300 bg-white text-sm">
      <!-- Cabecera para Estudiantes -->
      <thead class="bg-gray-100" v-if="estudiante && !empresa && !asignacion">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">DNI</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Nombre</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Apellido</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Curso</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Nacimiento</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Dirección</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Teléfono</th>
          <th class="px-4 py-3 text-center font-semibold text-gray-700">Vehículo</th>
          <th class="px-4 py-3 text-center font-semibold text-gray-700">Acciones</th>
        </tr>
      </thead>

      <!-- Cabecera para Empresas -->
      <thead class="bg-gray-100" v-if="empresa && !estudiante && !asignacion">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">CIF</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Nombre</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Teléfono</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Dirección</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Capacidad</th>
          <th class="px-4 py-3 text-center font-semibold text-gray-700">Acciones</th>
        </tr>
      </thead>

      <!-- Cabecera para Asignaciones -->
      <thead class="bg-gray-100" v-if="asignacion && !empresa && !estudiante">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Estudiante</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Empresa</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Inicio</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Fin</th>
        </tr>
      </thead>
    </table>
  </div>
</template>
