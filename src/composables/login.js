import { getProfesores } from './useDatabase'; // Cambia la ruta según la ubicación de tu módulo

// Cargar datos de los profesores desde la base de datos de Turso
let listItem = [];
if (!localStorage.getItem("listaDocumentoRegistros")) {
    localStorage.setItem("listaDocumentoRegistros", JSON.stringify([]));
  }
localStorage.setItem("crearPDF", false);

async function loadProfesores() {
    try {
        const { fetchProfesores } = getProfesores(); // Obtener la función para cargar profesores
        const result = await fetchProfesores(); // Ejecutar la consulta
        listItem = result.rows; // Asignar los datos a listItem
        console.log('Datos cargados:', listItem);
    } catch (error) {
        console.error('Error al cargar profesores:', error);
    }
}

// Función de login para validar usuario y contraseña
export async function login(userName, userPwd) {
    if (!userName || userName.trim() === "") {
        throw new Error('No se ha proporcionado un nombre de usuario');
    }

    if (!userPwd || userPwd.trim() === "") {
        throw new Error('No se ha proporcionado una contraseña');
    }

    // Asegurarse de que los datos de los profesores estén cargados
    if (listItem.length === 0) {
        await loadProfesores();
    }

    let isValidUser = false;

    for (let i = 0; i < listItem.length; i++) {
        const profesor = listItem[i];
        if (!profesor || !profesor.nombre || !profesor.contrasena) {
            console.error(`Error: datos incompletos en el elemento ${i}`);
            continue;
        }

        // Comprobar si el nombre de usuario y la contraseña coinciden
        if (profesor.nombre === userName && profesor.contrasena === userPwd) {
            isValidUser = true;
            localStorage.setItem('idProfesor', profesor.id_profesor);
            break;
        }
    }

    if (!isValidUser) {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    return { success: true, message: "Login exitoso" };
}
