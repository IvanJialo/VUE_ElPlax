<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">{{ title }}</h3>
        <p class="mb-6 text-gray-600">{{ message }}</p>
        <button @click="closeModal" class="bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] text-white px-4 py-2 rounded hover:opacity-90">
          Cerrar
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 0.75rem;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .modal-content h3 {
    color: #333;
  }
  
  .modal-content p {
    color: #666;
  }
  
  .modal-content button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    transition: opacity 0.3s;
  }
  </style>
  