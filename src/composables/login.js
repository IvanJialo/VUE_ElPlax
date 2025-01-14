// import { getProfesores } from './useDatabase'; // Cambia la ruta según la ubicación de tu módulo

// let listItem = [];

// // Cargar datos de los profesores desde la base de datos de Turso
// document.addEventListener('DOMContentLoaded', async function () {
//     try {
//         const { fetchProfesores } = getProfesores(); // Obtener la función para cargar profesores
//         const result = await fetchProfesores(); // Ejecutar la consulta
//         listItem = result.rows; // Asignar los datos a listItem
//         console.log('Datos cargados:', listItem);
//     } catch (error) {
//         console.error('Error al cargar profesores:', error);
//     }

//     // Agregar el evento al botón solo después de cargar los datos
//     const passwordButton = document.getElementById('iniciar-sesion');
//     passwordButton.addEventListener('click', nextPassword);
// });

// // Variables para guardar el nombre de usuario y la contraseña
// let userName;
// let userPwd;

// // Función para validar la contraseña y mostrar el mensaje de bienvenida
// function nextPassword() {
//     userName = document.getElementById('user').value;
//     userPwd = document.getElementById('password').value;

//     if (!userName || userName.trim() === "") {
//         resetFields();
//         alert('No se ha proporcionado un nombre de usuario');
//         return;
//     }

//     if (!userPwd || userPwd.trim() === "") {
//         resetFields();
//         alert('No se ha proporcionado una contraseña');
//         return;
//     }

//     let comprovador = false;
//     for (let i = 0; i < listItem.length; i++) {
//         const profesor = listItem[i];
//         if (!profesor || !profesor.nombre || !profesor.contrasena) {
//             console.error(`Error: datos incompletos en el elemento ${i}`);
//             continue;
//         }

//         // Comprobar si el nombre de usuario y la contraseña coinciden
//         if (profesor.nombre === userName && profesor.contrasena === userPwd) {
//             resetFields();
//             comprovador = true;
//             window.location.href = "./html/home.html";
//             break;
//         }
//     }

//     if (!comprovador) {
//         alert("Usuario o contraseña incorrectos.");
//         resetFields();
//     }
// }

// // Función para resetear los campos de entrada
// function resetFields() {
//     document.getElementById('user').value = '';
//     document.getElementById('password').value = '';
// }
