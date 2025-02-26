<script setup>
import { ref, onMounted, computed } from "vue";
import { getEmpresasID, putEmpresaId, getProfesores, getProfesoresID } from "../composables/useDatabase";

const idEmpresa = localStorage.getItem('idEmpresa');

const form = ref({
  nombre: "",
  nombre_oficial: "",
  direccion_sede_central: "",
  poblacion: "",
  codigo_postal: "",
  provincia: "",
  telefono_empresa: "",
  actividad_principal: "",
  otras_actividades: "",
  descripcion_breve: "",
  interesado_en: "",
  estado_actual: "",
  id_profesor: null,
});

const mensaje = ref(""); // Mensaje de éxito o error
const esEdicion = computed(() => !!idEmpresa); // Detecta si estamos en edición
const profesores = ref([]);

onMounted(async () => {
  // Cargar profesores
  const { fetchProfesores } = getProfesores();
  const resultProfesores = await fetchProfesores();
  if (resultProfesores && resultProfesores.rows) {
    profesores.value = resultProfesores.rows;
  }

  if (esEdicion.value) {
    try {
      const { fetchEmpresasID } = getEmpresasID(idEmpresa);
      const result = await fetchEmpresasID();
      if (result?.rows.length > 0) {
        const empresa = result.rows[0];
        form.value = {
          nombre: empresa.nombre,
          nombre_oficial: empresa.nombre_oficial,
          direccion_sede_central: empresa.direccion_sede_central,
          poblacion: empresa.poblacion,
          codigo_postal: empresa.codigo_postal,
          provincia: empresa.provincia,
          telefono_empresa: empresa.telefono_empresa,
          actividad_principal: empresa.actividad_principal,
          otras_actividades: empresa.otras_actividades,
          descripcion_breve: empresa.descripcion_breve,
          interesado_en: empresa.interesado_en,
          estado_actual: empresa.estado_actual,
          id_profesor: empresa.id_profesor,
        };
      }
    } catch (error) {
      console.error("Error al cargar empresa:", error);
    }
  }
});

const guardarEmpresa = async () => {
  try {
    if (esEdicion.value) {
      await putEmpresaId(
        idEmpresa,
        form.value.nombre,
        form.value.nombre_oficial,
        form.value.direccion_sede_central,
        form.value.poblacion,
        form.value.codigo_postal,
        form.value.provincia,
        form.value.telefono_empresa,
        form.value.actividad_principal,
        form.value.otras_actividades,
        form.value.descripcion_breve,
        form.value.interesado_en,
        form.value.estado_actual,
        form.value.id_profesor
      );
      mensaje.value = "Empresa actualizada con éxito.";
    } else {
      mensaje.value = "Funcionalidad de creación no implementada en este componente.";
    }
  } catch (error) {
    console.error("Error al guardar empresa:", error);
    mensaje.value = "Hubo un error al guardar la empresa.";
  }
};
</script>

<template>
  <section class="max-h-screen mt-32 mb-32 flex items-center">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#DCD0FF] via-purple-500 to-[#b197ff] sm:text-3xl mb-6">
        {{ esEdicion ? "Editar Empresa" : "Crear Empresa" }}
      </h2>

      <div class="mx-auto max-w-lg">
        <form @submit.prevent="guardarEmpresa" class="mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
          <div class="space-y-4">
            <div>
              <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre de la empresa*</label>
              <input v-model="form.nombre" id="nombre" type="text" required class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Ej: Tech Solutions S.L." />
            </div>
          </div>

          <div class="pt-6 mt-6 border-t border-gray-200">
            <h3 class="text-center text-lg font-medium text-gray-700 mb-4">Datos Opcionales</h3>

            <div class="space-y-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label for="nombre_oficial" class="block text-sm font-medium text-gray-700">Nombre Oficial</label>
                  <input v-model="form.nombre_oficial" id="nombre_oficial" type="text" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Nombre oficial de la empresa" />
                </div>

                <div>
                  <label for="direccion_sede_central" class="block text-sm font-medium text-gray-700">Dirección Sede Central</label>
                  <input v-model="form.direccion_sede_central" id="direccion_sede_central" type="text" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Dirección de la sede central" />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label for="poblacion" class="block text-sm font-medium text-gray-700">Población</label>
                  <input v-model="form.poblacion" id="poblacion" type="text" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Población" />
                </div>

                <div>
                  <label for="codigo_postal" class="block text-sm font-medium text-gray-700">Código Postal</label>
                  <input v-model="form.codigo_postal" id="codigo_postal" type="text" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Código postal" />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label for="provincia" class="block text-sm font-medium text-gray-700">Provincia</label>
                  <input v-model="form.provincia" id="provincia" type="text" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Provincia" />
                </div>

                <div>
                  <label for="telefono_empresa" class="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input v-model="form.telefono_empresa" id="telefono_empresa" type="tel" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Número de contacto" />
                </div>
              </div>

              <div>
                <label for="actividad_principal" class="block text-sm font-medium text-gray-700">Actividad Principal</label>
                <input v-model="form.actividad_principal" id="actividad_principal" type="text" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Actividad principal de la empresa" />
              </div>

              <div>
                <label for="otras_actividades" class="block text-sm font-medium text-gray-700">Otras Actividades</label>
                <input v-model="form.otras_actividades" id="otras_actividades" type="text" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Otras actividades" />
              </div>

              <div>
                <label for="descripcion_breve" class="block text-sm font-medium text-gray-700">Descripción Breve</label>
                <textarea v-model="form.descripcion_breve" id="descripcion_breve" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm" placeholder="Descripción breve de la empresa" rows="4"></textarea>
              </div>

              <div>
                <label for="interesado_en" class="block text-sm font-medium text-gray-700">Interesado en</label>
                <select v-model="form.interesado_en" id="interesado_en" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm">
                  <option value="">Seleccione una opción</option>
                  <option value="Soporte">Soporte</option>
                  <option value="Desarrollo">Desarrollo</option>
                </select>
              </div>

              <div>
                <label for="estado_actual" class="block text-sm font-medium text-gray-700">Estado Actual</label>
                <select v-model="form.estado_actual" id="estado_actual" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm">
                  <option value="">Seleccione una opción</option>
                  <option value="Potencial">Potencial</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Disponible">Disponible</option>
                  <option value="No disponible temporal">No disponible temporal</option>
                  <option value="No disponible Permanente">No disponible permanente</option>
                </select>
              </div>

              <div>
                <label for="id_profesor" class="block text-sm font-medium text-gray-700">Profesor Asociado</label>
                <select v-model="form.id_profesor" id="id_profesor" class="w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500 p-3 text-sm shadow-sm">
                  <option v-if="!form.id_profesor" value="">Seleccione un profesor</option>
                  <option v-for="profesor in profesores" :key="profesor.id_profesor" :value="profesor.id_profesor" :selected="profesor.id_profesor === form.id_profesor">
                    {{ profesor.nombre }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" class="block w-full rounded-lg bg-gradient-to-r from-[#b197ff] via-purple-500 to-[#b197ff] px-5 py-3 mt-6 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400">
            {{ esEdicion ? "Actualizar Empresa" : "Registrar Empresa" }}
          </button>

          <p v-if="mensaje" class="mt-4 text-center text-sm font-medium" :class="mensaje.includes('error') ? 'text-red-500' : 'text-green-500'">
            {{ mensaje }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
