import { getProfesores } from './useDatabase';

let listItem = [];

async function loadProfesores() {
    try {
        const { fetchProfesores } = getProfesores();
        const result = await fetchProfesores();
        listItem = result.rows;
        console.log('Datos cargados:', listItem);
    } catch (error) {
        console.error('Error al cargar profesores:', error);
    }
}

// Función para establecer la cookie
function setSessionCookie(idProfesor) {
    const token = btoa(`${idProfesor}-${Date.now()}`);
    document.cookie = `sessionToken=${token}; path=/; secure; SameSite=Strict`;
    console.log('Cookie creada:', document.cookie);
}

export async function login(userName, userPwd) {
    console.log(`Intentando login con: ${userName} / ${userPwd}`);

    if (!userName || !userPwd) {
        throw new Error('Usuario y contraseña son obligatorios');
    }

    if (listItem.length === 0) {
        await loadProfesores();
    }

    const profesor = listItem.find(p => p.nombre === userName && p.contrasena === userPwd);

    if (!profesor) {
        throw new Error('Usuario o contraseña incorrectos.');
    }

    setSessionCookie(profesor.id_profesor);
    console.log('Login exitoso');
    return { success: true };
}

export function logout() {
    document.cookie = 'sessionToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict';
    console.log('Sesión cerrada');
}
