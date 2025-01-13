<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import EstudiantesList from './components/EstudiantesList.vue'
import SideMenu from './components/SideMenu.vue';
</script>

<template>
  <div class="PageDivision">
    <SideMenu />
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