// Ejemplo en un composable: src/composables/useDatabase.js
import turso from "@/services/tursoClient";

function getEstudiantes() {
  const fetchEstudiantes = async () => {
  try {
    const result = await turso.execute('SELECT * FROM estudiantes'); // Ejecuta la consulta
    return result;
  } catch (error) {
    console.error('Error al obtener estudiantes:', error); // Muestra errores en la consola
    return { rows: [] };
  }
};
return { fetchEstudiantes };
}

function getEstudiantesID(id) {
  const fetchEstudiantesID = async () => {
    try {
      const result = await turso.execute('SELECT * FROM estudiantes WHERE id_estudiante = ?', [id]); // Ejecuta la consulta
      console.log(result.rows); // Muestra los datos en la consola
      return result;
    } catch (error) {
      console.error('Error al obtener estudiantes:', error); // Muestra errores en la consola
    }
  };
  return { fetchEstudiantesID };
}

function getEmpresasID(id) {
  const fetchEmpresasID = async () => {
    try {
      const result = await turso.execute('SELECT * FROM empresas WHERE id_empresa = ?', [id]); // Ejecuta la consulta
      console.log(result.rows); // Muestra los datos en la consola
      return result;
    } catch (error) {
      console.error('Error al obtener empresas:', error); // Muestra errores en la consola
    }
  };
  return { fetchEmpresasID };
}

function getProfesores() {
  const fetchProfesores = async () => {
    try {
      const result = await turso.execute('SELECT * FROM profesores'); // Ejecuta la consulta
      return result;
    } catch (error) {
      console.error('Error al obtener profesores:', error); // Muestra errores en la consola
    }
  };
  return { fetchProfesores };
}

async function getProfesoresID(id) {
  try {
    const result = await turso.execute('SELECT * FROM profesores WHERE id_profesor = ?', [id]); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
    return result;
  } catch (error) {
    console.error('Error al obtener profesores:', error); // Muestra errores en la consola
  }
}
function getProfesorID(id) {
  const fetchProfesorID = async () => {
    try {
      const result = await turso.execute('SELECT * FROM profesores WHERE id_profesor = ?', [id]); // Ejecuta la consulta
      console.log(result.rows); // Muestra los datos en la consola
      return result;
    } catch (error) {
      console.error('Error al obtener profesores:', error); // Muestra errores en la consola
    }
  };
  return { fetchProfesorID };
}

function getClaseID(id) {
  const fetchClaseID = async () => {
    try {
      const result = await turso.execute('SELECT * FROM clases WHERE id_clase = ?', [id]); // Ejecuta la consulta
      console.log(result.rows); // Muestra los datos en la consola
      return result;
    } catch (error) {
      console.error('Error al obtener clases:', error); // Muestra errores en la consola
    }
  };
  return { fetchClaseID };
}
function getAsignacionesID(id) {
  const fetchAsignacionesID = async () => {
    try {
      const result = await turso.execute('SELECT * FROM asignaciones WHERE id_asignacion = ?', [id]); // Ejecuta la consulta
      console.log(result.rows); // Muestra los datos en la consola
      return result;
    } catch (error) {
      console.error('Error al obtener asignaciones:', error); // Muestra errores en la consola
    }
  };
  return { fetchAsignacionesID };
}

function getEmpresas() {
  const fetchEmpresas = async () => {
    try {
      const result = await turso.execute('SELECT * FROM empresas'); // Ejecuta la consulta
      return result;
    } catch (error) {
      console.error('Error al obtener empresas:', error); // Muestra errores en la consola
    }
  };
  return { fetchEmpresas };
}

function getClases() {
  const fetchClases = async () => {
    try {
      const result = await turso.execute('SELECT * FROM clases'); // Ejecuta la consulta
      return result;
    } catch (error) {
      console.error('Error al obtener empresas:', error); // Muestra errores en la consola
    }
  };
  return { fetchClases };
}

function getAsignaciones() {
  const fetchAsignaciones = async () => {
    try {
      const result = await turso.execute('SELECT * FROM asignaciones'); // Ejecuta la consulta
      console.log(result.rows); // Muestra los datos en la consola
      return result;
    } catch (error) {
      console.error('Error al obtener empresas:', error); // Muestra errores en la consola
    }
  };
  return { fetchAsignaciones };
}

async function postInsertarEstudiantes(dni, nombre, apellido, curso, fecha, direccion, email, telefono, vehiculo) {
  try {
    const tieneVehiculo = vehiculo ? 1 : 0; // Convertimos el boolean a un valor 1 o 0

    // Verificar si el curso está definido, si no, establecer id_clase a "No asignado"
    const idClase = curso ? curso : null;

    // Verificar si el email está definido, si no, establecer email a NULL
    const emailValue = email ? email : null;

    const query = `
        INSERT INTO estudiantes (dni, nombre, apellido, id_clase, fecha_nacimiento, direccion, email, telefono, tiene_vehiculo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const values = [dni, nombre, apellido, idClase, fecha, direccion, emailValue, telefono, tieneVehiculo];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al insertar estudiantes:', error); // Muestra errores en la consola
  }
}

async function postInsertarEmpresas(nombre, nombre_oficial, direccion_sede_central, poblacion, codigo_postal, provincia, telefono_empresa, actividad_principal, otras_actividades, descripcion_breve, interesado_en, estado_actual, profesor) {
  try {
    // Validación: Asegúrate de que el nombre no esté vacío
    if (!nombre) {
      throw new Error("El nombre de la empresa es obligatorio");
    }

    const query = `
      INSERT INTO empresas (
        nombre, nombre_oficial, direccion_sede_central, poblacion, codigo_postal,
        provincia, telefono_empresa, actividad_principal, otras_actividades,
        descripcion_breve, interesado_en, estado_actual, profesor
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      nombre,
      nombre_oficial || null,
      direccion_sede_central || null,
      poblacion || null,
      codigo_postal || null,
      provincia || null,
      telefono_empresa || null,
      actividad_principal || null,
      otras_actividades || null,
      descripcion_breve || null,
      interesado_en || null,
      estado_actual || null,
      profesor || null
    ];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al insertar empresas:', error.message); // Muestra errores en la consola
    throw error; // Re-lanzar el error para que pueda ser manejado por el llamador
  }
}


async function postInsertarContactos(id_empresa, nombre, email, telefono) {
  try {
    const query = `
        INSERT INTO contacto_empresas (id_empresa, nombre, email, telefono) 
        VALUES (?, ?, ?, ?)
        `;
    const values = [id_empresa, nombre, email, telefono];
    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al insertar contactos:', error); // Muestra errores en la consola
  }
}


async function postInsertarAsignaciones(id_estudiante, id_empresa, fecha_asignacion, fecha_finalizacion) {
  try {
    const query = `
        INSERT INTO asignaciones (id_estudiante, id_empresa, fecha_asignacion, fecha_finalizacion) 
        VALUES (?, ?, ?, ?)
        `;
    const values = [id_estudiante, id_empresa, fecha_asignacion, fecha_finalizacion];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al insertar empresas:', error); // Muestra errores en la consola
  }
}

async function postInsertarClases(nombre_clase, id_profesor){
  try {
    const query = `
        INSERT INTO clases (nombre_clase, id_profesor) 
        VALUES (?, ?)
        `;
    const values = [nombre_clase, id_profesor];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al insertar clases:', error); // Muestra errores en la consola
  }
}

async function deleteEstudianteId(id) {
  try {
    const result = await turso.execute('DELETE FROM estudiantes WHERE id_estudiante = ?', [id]); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al eliminar estudiantes:', error); // Muestra errores en la consola
  }
}
async function deleteClaseId(id) {
  try {
    const result = await turso.execute('DELETE FROM clases WHERE id_clase = ?', [id]); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al eliminar clases:', error); // Muestra errores en la consola
  }
}

async function deleteAsignacionId(id) {
  try {
    const result = await turso.execute('DELETE FROM asignaciones WHERE id_asignacion = ?', [id]); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al eliminar asignaciones:', error); // Muestra errores en la consola
  }
}

async function deleteEmpresaId(id) {
  try {
    const result = await turso.execute('DELETE FROM empresas WHERE id_empresa = ?', [id]); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al eliminar empresas:', error); // Muestra errores en la consola
  }
}

async function deleteProfesorId(id) {
  try {
    const result = await turso.execute('DELETE FROM profesores WHERE id_profesor = ?', [id]); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al eliminar profesores:', error); // Muestra errores en la consola
  }
}

async function putEstudianteId(id, dni, nombre, apellido, curso, fecha, direccion, email, telefono, vehiculo) {
  try {
    const tieneVehiculo = vehiculo ? 1 : 0; // Convertimos el boolean a un valor 1 o 0

    const query = `
        UPDATE estudiantes 
        SET dni = ?, nombre = ?, apellido = ?, id_clase = ?, fecha_nacimiento = ?, direccion = ?, email = ?, telefono = ?, tiene_vehiculo = ? 
        WHERE id_estudiante = ?
        `;
    const values = [dni, nombre, apellido, curso, fecha, direccion, email, telefono, tieneVehiculo, id];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al actualizar estudiantes:', error); // Muestra errores en la consola
  }
}
async function putProfesorId(id, nombre, apellido, email, fecha_nacimiento, contrasena, id_clase) {
  try {
    const query = `
        UPDATE profesores
        SET nombre = ?, apellido = ?, email = ?, fecha_nacimiento = ?, contrasena = ?, id_clase = ?
        WHERE id_profesor = ?
        `;
    const values = [nombre, apellido, email, fecha_nacimiento, contrasena, id_clase, id];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al actualizar profesores:', error); // Muestra errores en la consola
  }
}

async function putEmpresaId(id, nombre, nombre_oficial, direccion_sede_central, poblacion, codigo_postal, provincia, telefono_empresa, actividad_principal, otras_actividades, descripcion_breve, interesado_en, estado_actual, profesor) {
  try {
    const query = `
        UPDATE empresas 
        SET nombre = ?, nombre_oficial = ?, direccion_sede_central = ?, poblacion = ?, codigo_postal = ?, provincia = ?, telefono_empresa = ?, actividad_principal = ?, otras_actividades = ?, descripcion_breve = ?, interesado_en = ?, estado_actual = ?, profesor = ? 
        WHERE id_empresa = ?
        `;
    const values = [nombre, nombre_oficial, direccion_sede_central, poblacion, codigo_postal, provincia, telefono_empresa, actividad_principal, otras_actividades, descripcion_breve, interesado_en, estado_actual, profesor, id];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al actualizar empresas:', error); // Muestra errores en la consola
  }
}

async function putClaseId(id, nombre_clase, id_profesor) {
  try {
    const query = `
        UPDATE clases 
        SET nombre_clase = ?, id_profesor = ? 
        WHERE id_clase = ?
        `;
    const values = [nombre_clase, id_profesor, id];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al actualizar clases:', error); // Muestra errores en la consola
  }
}
async function postInsertarProfesores(nombre, apellido, email, fecha_nacimiento, contrasena, id_clase){
  try {
    const query = `
        INSERT INTO profesores (nombre, apellido, email, fecha_nacimiento, contrasena, id_clase) 
        VALUES (?, ?, ?, ?, ?, ?)
        `;
    const values = [nombre, apellido, email, fecha_nacimiento, contrasena, id_clase];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al insertar profesores:', error); // Muestra errores en la consola
  }
}

async function putAsignacionId(id, id_estudiante, id_empresa, fecha_asignacion, fecha_finalizacion) {
  try {
    const query = `
        UPDATE asignaciones 
        SET id_estudiante = ?, id_empresa = ?, fecha_asignacion = ?, fecha_finalizacion = ? 
        WHERE id_asignacion = ?
        `;
    const values = [id_estudiante, id_empresa, fecha_asignacion, fecha_finalizacion, id];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al actualizar asignaciones:', error); // Muestra errores en la consola
  }
}

async function exportCSV() {
  try {
    // Obtener datos de empresas
    const empresas = await getEmpresas().fetchEmpresas();

    // Filtrar el campo 'id_empresa' de los encabezados
    const headers = Object.keys(empresas.rows[0]).filter(key => key !== 'id_empresa');

    // Generar el contenido del CSV
    const csvContent = [
      headers.join(","), // Encabezados
      ...empresas.rows.map(row => 
        headers.map(header => {
          const value = row[header];
          // Entrecomillar valores con comas o saltos de línea
          if (typeof value === 'string' && (value.includes(',') || value.includes('\n'))) {
            return `"${value}"`;
          }
          return value;
        }).join(",")
      )
    ].join("\n");

    // Crear y descargar el archivo CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "ElPlax.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al exportar CSV:", error);
  }
}

function getRegistros() {
  const fetchRegistros = async () => {
    try {
      const result = await turso.execute('SELECT * FROM registros'); // Ejecuta la consulta para obtener todos los registros
      return result;
    } catch (error) {
      console.error('Error al obtener registros:', error); // Muestra errores en la consola
      return { rows: [] };
    }
  };
  return { fetchRegistros };
}

async function getRegistrosID(id) {
  try {
    const result = await turso.execute('SELECT * FROM registros WHERE id_registros = ?', [id]); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
    return result;
  } catch (error) {
    console.error('Error al obtener registros:', error); // Muestra errores en la consola
  }
}

async function postInsertarRegistros(llamada_registrada, correo_registrado, reunion_registrada, observacion, fecha_asignacion, id_empresa, id_profesor) {
  try {
    // Convertir los booleanos a 1 o 0
    const llamada = llamada_registrada ? 1 : 0;
    const correo = correo_registrado ? 1 : 0;
    const reunion = reunion_registrada ? 1 : 0;
    
    const query = `
      INSERT INTO registros (llamada_registrada, correo_registrado, reunion_registrada, observacion, fecha_asignacion, id_empresa, id_profesor)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [llamada, correo, reunion, observacion, fecha_asignacion, id_empresa, id_profesor];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
    return result;
  } catch (error) {
    console.error('Error al insertar registro:', error); // Muestra errores en la consola
  }
}

export {
  getEstudiantes,
  getEstudiantesID,
  getEmpresasID,
  getProfesores,
  getEmpresas,
  getClases,
  getAsignaciones,
  postInsertarEstudiantes,
  postInsertarEmpresas,
  postInsertarContactos,
  postInsertarAsignaciones,
  deleteEstudianteId,
  deleteEmpresaId,
  putEstudianteId,
  putEmpresaId,
  exportCSV,
  getRegistros,
  postInsertarRegistros,
  getRegistrosID,
  getProfesoresID,
  postInsertarClases,
  putClaseId,
  getClaseID,
  deleteClaseId,
  deleteAsignacionId,
  getAsignacionesID,
  putAsignacionId,
  postInsertarProfesores,
  deleteProfesorId,
  putProfesorId,
  getProfesorID
}