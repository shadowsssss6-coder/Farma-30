/* RF01 - Inicio de Sesión*/

// Credenciales válidas del sistema (simuladas)
const USUARIOS = [
  { user: 'admin',  pass: '1234', rol: 'Empleado · Admin', redirige: '../RF02_inventario/inventario.html' },
  { user: 'carlos', pass: '1234', rol: 'Empleado',         redirige: '../RF02_inventario/inventario.html' },
  { user: 'cliente',pass: '1234', rol: 'Cliente',          redirige: '../RF02_inventario/inventario.html' },
];

// Pestaña activa (cliente / empleado)
let rolActivo = 'cliente';

/**
 * Cambia la pestaña activa entre Cliente y Empleado
 * @param {string} rol
 */
function setTab(rol) {
  rolActivo = rol;
  document.getElementById('tabCliente').classList.toggle('active',  rol === 'cliente');
  document.getElementById('tabEmpleado').classList.toggle('active', rol === 'empleado');
  // Oculta el error al cambiar de pestaña
  ocultarError();
}

/**
 * Intenta autenticar al usuario con las credenciales ingresadas
 */
function tryLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  if (!user || !pass) {
    mostrarError();
    return;
  }

  const encontrado = USUARIOS.find(
    u => u.user === user && u.pass === pass
  );

  if (encontrado) {
    // Guarda el rol en sessionStorage para uso en otros módulos
    sessionStorage.setItem('usuario', encontrado.user);
    sessionStorage.setItem('rol', encontrado.rol);
    window.location.href = encontrado.redirige;
  } else {
    mostrarError();
  }
}

/**
 * Muestra la alerta de credenciales incorrectas
 */
function mostrarError() {
  document.getElementById('loginAlert').style.display = 'flex';
}

/**
 * Oculta la alerta de error
 */
function ocultarError() {
  document.getElementById('loginAlert').style.display = 'none';
}

/**
 * Recuperación de contraseña (simulada)
 */
document.getElementById('btnRecuperar').addEventListener('click', function () {
  alert('Se enviará un correo de recuperación a tu dirección registrada.');
});

// Permite iniciar sesión con la tecla Enter
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') tryLogin();
});

// Oculta el error cuando el usuario empieza a escribir
document.getElementById('loginUser').addEventListener('input', ocultarError);
document.getElementById('loginPass').addEventListener('input', ocultarError);
