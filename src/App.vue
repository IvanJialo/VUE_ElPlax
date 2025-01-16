<script setup>
import { RouterLink, RouterView } from 'vue-router'
import EstudiantesYProfesoresList from './components/EstudiantesYProfesoresList.vue'
import SideMenu from './components/SideMenu.vue';
</script>

<template>
  <div class="PageDivision">
    <!-- <SideMenu /> -->
    <!-- <EstudiantesYProfesoresList /> -->
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