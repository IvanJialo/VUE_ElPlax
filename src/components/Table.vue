<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { defineProps } from 'vue';
import { ref } from "vue";

// Estado reactivo para alternar entre mostrar descripción o no (opcional)
const showDescription = ref(false);

// Función para alternar el estado (opcional)
const toggleDescription = () => {
  showDescription.value = !showDescription.value;
};

// Recibiendo las props
defineProps({
  estudiante: {
    type: Object,
    required: true
  },
});
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-gray-200 my-4">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead>
        <tr>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">DNI</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nombre</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Apellido</th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ estudiante.id_estudiante }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.dni }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.nombre }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ estudiante.apellido }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
