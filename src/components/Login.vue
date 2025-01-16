<script>
import { login } from '@/composables/login';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      user: '', // Inicializamos la propiedad email
      password: '', // Inicializamos la propiedad password
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await login(this.user, this.password); // Usamos las propiedades definidas
        // Redirigir a otra página después del login exitoso
        this.router.push('/ejemplo');
      } catch (error) {
        console.error(error.message);
        alert(error.message); // Mostrar el error al usuario si es necesario
        document.getElementById('user').value = '';
        document.getElementById('password').value = '';
      }
    },
  },
};
</script>


<template>
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg">
      <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">El Plax</h1>

      <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
        Tu solución CRM de confianza para gestionar las FCT de la manera más rápida y eficiente.
      </p>

      <form @submit.prevent="handleLogin" class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <p class="text-center text-lg font-medium">Iniciar sesión</p>

        <div>
          <label for="text" class="sr-only">Username</label>
          <div class="relative">
            <input v-model="user" type="text" id="user"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Nombre de usuario.." />
          </div>
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>
          <div class="relative">
            <input v-model="password" type="password" id="password"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Contraseña.." />
          </div>
        </div>

        <button type="submit"
          class="block w-full rounded-lg bg-indigo-600 px-5 py-3 mt-3 text-sm font-medium text-white">
          Iniciar sesión
        </button>
      </form>
    </div>
  </div>
</template>
