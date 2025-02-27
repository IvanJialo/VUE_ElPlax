<script setup>
import { defineProps } from 'vue';

// Recibiendo las props
defineProps({
  estudiante: {
    type: Boolean,
    default: false, // Valor por defecto
  },
  empresa: {
    type: Boolean,
    default: false, // Valor por defecto
  },
  asignacion: {
    type: Boolean,
    default: false, // Valor por defecto
  },
  registro: {
    type: Boolean,
    default: false, // Valor por defecto
  },
  crearPDF: {
    type: Boolean,
    default: false, // Valor por defecto
  },
  clase: {
    type: Boolean,
    default: false, // Valor por defecto
  },
  profesor: {
    type: Boolean,
    default: false, // Valor por defecto
  },
});
</script>

<template>
  <!-- <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-200 my-4"> -->
    <!-- <table class="min-w-full divide-y divide-gray-300 bg-white text-sm"> -->
      <!-- Cabecera para Estudiantes -->
      <thead class="bg-gray-100" v-if="estudiante && !empresa && !asignacion && !registro && !crearPDF">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">DNI</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Nombre</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Apellido</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Curso</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Nacimiento</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Dirección</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Teléfono</th>
          <th class="px-4 py-3 text-center font-semibold text-gray-700">Vehículo</th>
          <th class="px-4 py-3 text-center font-semibold text-gray-700">Acciones</th>
        </tr>
      </thead>

      <!-- Cabecera para Empresas -->
      <thead class="bg-gray-100" v-if="empresa && !estudiante && !asignacion && !registro && !crearPDF">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Nombre</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">CIF</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Dirección</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Población</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">CP</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Provincia</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Telf</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Actividad Principal</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Otras Actividades</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Descripción</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Interesado En</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Estado</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Profesor</th>
          <th class="px-4 py-3 text-center font-semibold text-gray-700">Acciones</th>
        </tr>
      </thead>

      <!-- Cabecera para Asignaciones -->
      <thead class="bg-gray-100" v-if="asignacion && !empresa && !estudiante && !registro && !crearPDF">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Estudiante</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Empresa</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Inicio</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Fin</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Acciones</th>
        </tr>
      </thead>

      <!-- Cabecera para Registros -->
      <thead class="bg-gray-100" v-if="registro && !empresa && !estudiante && !asignacion && !crearPDF">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Profesor</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Empresa</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Fecha</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Llamada</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Correo</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Reunión</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Observaciones</th> 
        </tr>
      </thead>

      <!-- Cabecera para Crear PDF -->
      <thead class="bg-gray-100" v-if="!registro && !empresa && !estudiante && !asignacion && crearPDF">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Profesor</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Empresa</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Fecha</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Llamada</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Correo</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Reunión</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Observaciones</th> 
          <td class="px-4 py-3 text-center font-semibold text-gray-700">PDF</td>
        </tr>
      </thead>

      <!-- Cabecera para Clases -->
      <thead class="bg-gray-100" v-if="clase && !empresa && !estudiante && !asignacion && !registro && !crearPDF">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Nombre</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Profesor</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Acciones</th>
        </tr>
      </thead>

      <!-- Cabecera para Profesores -->
      <thead class="bg-gray-100" v-if="profesor && !empresa && !estudiante && !asignacion && !registro && !crearPDF">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Nombre</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Apellido</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Fecha Nacimiento</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Contraseña</th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Clase</th>
          <th class="px-4 py-3 text-center font-semibold text-gray-700">Acciones</th>
        </tr>
      </thead>
    <!-- </table> -->
  <!-- </div> -->
</template>
