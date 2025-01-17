<script setup>
import { RouterLink, RouterView } from 'vue-router';
import tablee from './components/Table.vue';

const estudiante = null; // Simula un caso donde aún no hay datos
</script>

<template>
  <div class="PageDivision">
    <RouterView />
  </div>
</template>
<style>
.PageDivision {
  display: grid;
  grid-template-rows: 800px auto;
  height: 100vh;
}
</style>