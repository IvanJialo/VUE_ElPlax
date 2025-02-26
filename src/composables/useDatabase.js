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
    const query = `
        INSERT INTO empresas (nombre, nombre_oficial, direccion_sede_central, poblacion, codigo_postal, provincia, telefono_empresa, actividad_principal, otras_actividades, descripcion_breve, interesado_en, estado_actual, profesor) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const values = [nombre, nombre_oficial, direccion_sede_central, poblacion, codigo_postal, provincia, telefono_empresa, actividad_principal, otras_actividades, descripcion_breve, interesado_en, estado_actual, profesor];
    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al insertar empresas:', error); // Muestra errores en la consola
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

async function deleteEstudianteId(id) {
  try {
    const result = await turso.execute('DELETE FROM estudiantes WHERE id_estudiante = ?', [id]); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al eliminar estudiantes:', error); // Muestra errores en la consola
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

async function exportCSV() {
  try {
    const estudiantes = await getEstudiantes().fetchEstudiantes();
    const empresas = await getEmpresas().fetchEmpresas();
    // const contactos = await getContactos().fetchContactos(); // Asegúrate de tener una función para obtener contactos

    const data = [
      { title: "Empresas", rows: empresas.rows },
      // { title: "Contactos", rows: contactos.rows },
      { title: "Estudiantes", rows: estudiantes.rows },
    ];

    const csvContent = data
      .map(
        (section) =>
          `title,${section.title}\n` +
          Object.keys(section.rows[0]).filter(key => key !== 'id_estudiante').join(",") + "\n" + // Excluir el ID de estudiantes
          section.rows.map((row) => 
            Object.values(row)
                  .filter((value, index) => index !== 0) // Excluir el primer valor (ID de estudiantes)
                  .join(",")
          ).join("\n")
      )
      .join("\n\n");

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
  getProfesoresID
}