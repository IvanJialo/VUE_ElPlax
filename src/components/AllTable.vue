<script setup>
import { defineProps } from 'vue';

// Recibiendo las props
defineProps({
  estudiante: {
    type: Object,
    required: false, // Opcional
  },
  empresa: {
    type: Object,
    required: false, // Opcional
  },
});
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-gray-200 my-4">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <!-- Renderizar datos de estudiante si existe -->
      <tbody class="divide-y divide-gray-200" v-if="estudiante && !empresa">
        <tr>
          <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ estudiante.id_estudiante }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.dni }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.nombre }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.apellido }}</td>
        </tr>
      </tbody>
      <!-- Renderizar datos de empresa si existe -->
      <tbody class="divide-y divide-gray-200" v-if="empresa && !estudiante">
        <tr>
          <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ empresa.id_empresa }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ empresa.CIF }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ empresa.nombre_empresa }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ empresa.email }}</td>
        </tr>
      </tbody>
      <!-- Mensaje en caso de no recibir datos válidos -->
      <tfoot v-if="!estudiante && !empresa">
        <tr>
          <td colspan="4" class="whitespace-nowrap px-4 py-2 text-center text-gray-500">
            No hay datos disponibles para mostrar.
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
