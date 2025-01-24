<script setup>
import { onMounted, ref } from 'vue';
import { getEstudiantes, getEmpresas, getAsignaciones } from '@/composables/useDatabase';

const { fetchEstudiantes } = getEstudiantes();
const { fetchEmpresas } = getEmpresas();
const { fetchAsignaciones } = getAsignaciones();

const estudiantes = ref(0);
const empresas = ref(0);
const asignaciones = ref(0);

onMounted(async () => {
  const [estudiantesRes, empresasRes, asignacionesRes] = await Promise.all([
    fetchEstudiantes(),
    fetchEmpresas(),
    fetchAsignaciones(),
  ]);

  estudiantes.value = estudiantesRes.rows.length;
  empresas.value = empresasRes.rows.length;
  asignaciones.value = asignacionesRes.rows.length;
});

</script>
<template>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Dashboard</h2>

            <p class="mt-4 text-gray-500 sm:text-xl">
                ¡Aquí tienes un pequeño resumen de los datos almacenados en la base de datos!
            </p>
        </div>

        <dl class="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            <div class="flex flex-col rounded-lg bg-[#DCD0FF]/40 px-4 py-8 text-center">
                <dt class="order-last text-lg font-medium text-gray-500">Total Alumnos</dt>

                <dd class="text-4xl font-extrabold text-[#b197ff] md:text-5xl">{{ estudiantes }}</dd>
            </div>

            <div class="flex flex-col rounded-lg bg-[#DCD0FF]/40 px-4 py-8 text-center">
                <dt class="order-last text-lg font-medium text-gray-500">Total Empresas</dt>

                <dd class="text-4xl font-extrabold text-[#b197ff] md:text-5xl">{{ empresas }}</dd>
            </div>

            <div class="flex flex-col rounded-lg bg-[#DCD0FF]/40 px-4 py-8 text-center">
                <dt class="order-last text-lg font-medium text-gray-500">Total Asignaciones</dt>

                <dd class="text-4xl font-extrabold text-[#b197ff] md:text-5xl">{{ asignaciones }}</dd>
            </div>
        </dl>
    </div>
</template>