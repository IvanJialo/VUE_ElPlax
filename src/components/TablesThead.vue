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
  <div class="overflow-x-auto rounded-lg border border-gray-200 my-4">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <!-- Condicional para mostrar el thead correcto -->
      <thead v-if="estudiante && !empresa && !asignacion">
        <tr>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">DNI</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nombre</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Apellido</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Curso</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Fecha nacimiento</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Dirección</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Teléfono</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Vehículo</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Modificar</th>
        </tr>
      </thead>
      <thead v-if="empresa && !estudiante && !asignacion">
        <tr>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">CIF</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nombre</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Teléfono</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Dirección</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Capacidad</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Modificar</th>
        </tr>
      </thead>
      <thead v-if="asignacion && !empresa && !estudiante">
        <tr>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Estudiante</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Empresa</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Fecha</th>
        </tr>
      </thead>
    </table>
  </div>
</template>
