<!-- DownloadTemplateButton.vue -->
<template>
    <button
      @click="descargarPlantilla"
      class="block w-[300px] cursor-pointer rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-4 text-sm font-medium text-white shadow-sm hover:opacity-90"
    >
      Descargar Plantilla CSV
    </button>
    <ModalConfirmation
      :isOpen="isModalOpen"
      title="Descarga Completada"
      message="La plantilla CSV se ha descargado correctamente."
      @close="closeModal"
    />
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ModalConfirmation from './ModalConfirmation.vue';
  
  const isModalOpen = ref(false);
  
  const descargarPlantilla = () => {
    const csvContent = `data:text/csv;charset=utf-8,nombre,nombre_oficial,direccion_sede_central,poblacion,codigo_postal,provincia,telefono_empresa,actividad_principal,otras_actividades,descripcion_breve,interesado_en,estado_actual,id_profesor\n"Empresa Ejemplo","Nombre Oficial Ejemplo","Calle Falsa 123","Madrid","28001","Madrid","600123456","Desarrollo de software","Consultoría","Empresa de tecnología","Soporte","Potencial",1\n"Otra Empresa","","Avenida Siempre Viva 456","Barcelona","08001","Barcelona","600654321","Venta al por menor","","Tienda de ropa","Desarrollo","Disponible",2`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "plantilla_empresas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    isModalOpen.value = true;
  };
  
  const closeModal = () => {
    isModalOpen.value = false;
  };
  </script>
  