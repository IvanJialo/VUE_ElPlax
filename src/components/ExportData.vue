<template>
  <div>
    <button
      @click="handleDownload"
      class="flex items-center gap-2 px-4 text-gray-400 rounded-lg transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path fill="#b197ff"
          d="M15.959 20.046H4V4.004h6.979v4.98h4.98V10h2.051V8.014l-2.05-2.052L14 4.004l-1.99-1.99h-8a1.997 1.997 0 0 0-1.99 2l-.01 16a1.997 1.997 0 0 0 1.99 2h14.01v-2Zm5.301-2.032l1.75-6h-1.5l-1 3.43l-1-3.43h-1.5l1.75 6z"/>
        <path fill="#b197ff" d="M10.01 12.014h-3a1.003 1.003 0 0 0-1 1v4a1.003 1.003 0 0 0 1 1h3a1.003 1.003 0 0 0 1-1v-1h-1.5v.5h-2v-3h2v.5h1.5v-1a1.003 1.003 0 0 0-1-1m7 1.506v-1.506h-4a1 1 0 0 0-1 1v1.757a1 1 0 0 0 1 1h2.51v.743h-3.51v1.507h4a1 1 0 0 0 1-1v-1.757a1 1 0 0 0-1-1H13.5v-.743Z"/>
      </svg>
    </button>

    <!-- Modal de Confirmación -->
    <ModalConfirmation
      :isOpen="isModalOpen"
      title="Descarga Completada"
      message="Los datos se han exportado correctamente."
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { exportCSV } from "@/composables/useDatabase";
import ModalConfirmation from './ModalConfirmation.vue';

const isModalOpen = ref(false);

const handleDownload = async () => {
  await exportCSV(); // Llama a la función para exportar datos
  isModalOpen.value = true; // Abre el modal después de la descarga
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>
