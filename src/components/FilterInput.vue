<template>
    <div class="flex items-center gap-2 mb-4">
        <input v-model="filterText" type="text" placeholder="Filtrar..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" />
        <button @click="clearFilter"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">
            Limpiar
        </button>
    </div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue';

const filterText = ref('');

const emit = defineEmits(['filter']);

// Emitir el valor del filtro cada vez que cambie
watch(filterText, (newValue) => {
    emit('filter', newValue.toLowerCase());
});

// Limpiar el filtro
function clearFilter() {
    filterText.value = '';
    emit('filter', '');
}
</script>