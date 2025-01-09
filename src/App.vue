<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import EstudiantesList from './components/EstudiantesList.vue'
</script>

<template>
  <div class="PageDivision">
    <EstudiantesList />
    <!-- <RouterView /> -->
  </div>
</template>

<style>
.PageDivision {
  display: grid;
  grid-template-rows: 2000px auto;
  height: 100vh;
}
</style>