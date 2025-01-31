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

    const query = `
        INSERT INTO estudiantes (dni, nombre, apellido, id_clase, fecha_nacimiento, direccion, email, telefono, tiene_vehiculo) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const values = [dni, nombre, apellido, curso, fecha, direccion, email, telefono, tieneVehiculo];

    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al insertar estudiantes:', error); // Muestra errores en la consola
  }
}

async function postInsertarEmpresas(cif, nombre, telefono, email, direccion, capacidad, observacion) {
  try {
    const query = `
        INSERT INTO empresas (CIF, nombre_empresa, telefono, email, direccion, capacidad, observacion) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    const values = [cif, nombre, telefono, email, direccion, capacidad, observacion];
    const result = await turso.execute(query, values); // Ejecuta la consulta
    console.log(result.rows); // Muestra los datos en la consola
  } catch (error) {
    console.error('Error al insertar empresas:', error); // Muestra errores en la consola
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

async function putEmpresaId(id, cif, nombre, telefono, email, direccion, capacidad, observacion) {
  try {
    const query = `
        UPDATE empresas 
        SET CIF = ?, nombre_empresa = ?, telefono = ?, email = ?, direccion = ?, capacidad = ?, observacion = ? 
        WHERE id_empresa = ?
        `;
    const values = [cif, nombre, telefono, email, direccion, capacidad, observacion, id];

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

    const data = [
      { title: "Estudiantes", rows: estudiantes.rows },
      { title: "Empresas", rows: empresas.rows },
    ];

    const csvContent = data
      .map(
        (section) =>
          `${section.title}\n` +
          section.rows.map((row) => Object.values(row).join(",")).join("\n")
      )
      .join("\n\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "datos.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al r CSV:", error);
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
  postInsertarAsignaciones,
  deleteEstudianteId,
  deleteEmpresaId,
  putEstudianteId,
  putEmpresaId,
  exportCSV
}