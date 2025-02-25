<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import SideMenu from './components/SideMenu.vue';

const router = useRouter();

// Determina si el SideMenu debe mostrarse
const shouldShowSideMenu = computed(() => {
  return router.currentRoute.value.name !== 'login';
});
</script>

<template>
  <div :class="['PageDivision', { 'no-side-menu': !shouldShowSideMenu }]">
    <!-- SideMenu -->
    <SideMenu v-if="shouldShowSideMenu" class="fixed" />

    <!-- Main Content -->
    <div class="Content invisible-scrollbar">
      <RouterView />
    </div>
  </div>
</template>

<style>
.PageDivision {
  display: grid;
  place-content: center;
  height: 100vh;
  width: 100vw;
}

.PageDivision.no-side-menu {
  grid-template-columns: 1fr; /* Sin SideMenu, el contenido ocupa todo el ancho */
}

.Content {
  padding: 16px; /* Espaciado para el contenido principal */
  overflow-y: auto; /* Habilita scroll si el contenido es grande */
}
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
