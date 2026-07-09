import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar.jsx';
import { useSesion } from '../utils/SesionContext.jsx';
import { USUARIOS } from '../utils/globalUtils.js';
import '../styles/login.css';

/**
 * RF01 - Módulo de Inicio de Sesión.
 * Permite autenticarse como Cliente o Empleado, validando las
 * credenciales contra la lista de usuarios simulada (USUARIOS).
 * Historia de usuario: "Como usuario del sistema, quiero iniciar
 * sesión con mis credenciales para acceder al módulo correspondiente
 * a mi rol."
 */
export default function RF01Login() {
  const [rolActivo, setRolActivo] = useState('cliente');
  const [usuarioInput, setUsuarioInput] = useState('');
  const [claveInput, setClaveInput] = useState('');
  const [mostrarError, setMostrarError] = useState(false);

  const navigate = useNavigate();
  const { iniciarSesion } = useSesion();

  /** Cambia la pestaña activa entre Cliente y Empleado. */
  function setTab(rol) {
    setRolActivo(rol);
    setMostrarError(false);
  }

  /** Intenta autenticar al usuario con las credenciales ingresadas. */
  function tryLogin() {
    const usuario = usuarioInput.trim();
    const clave = claveInput.trim();

    if (!usuario || !clave) {
      setMostrarError(true);
      return;
    }

    const encontrado = USUARIOS.find((u) => u.user === usuario && u.pass === clave);

    if (encontrado) {
      iniciarSesion(encontrado.user, encontrado.rol);
      navigate('/rf02-inventario');
    } else {
      setMostrarError(true);
    }
  }

  /** Recuperación de contraseña (simulada). */
  function recuperarClave() {
    alert('Se enviará un correo de recuperación a tu dirección registrada.');
  }

  // Permite iniciar sesión con la tecla Enter
  useEffect(() => {
    function alPresionarTecla(e) {
      if (e.key === 'Enter') tryLogin();
    }
    document.addEventListener('keydown', alPresionarTecla);
    return () => document.removeEventListener('keydown', alPresionarTecla);
  });

  return (
    <>
      <TopBar rf="RF01" titulo="Inicio de Sesión" next="/rf02-inventario" />

      <main className="page">
        <div className="login-wrap">
          <div className="login-avatar">
            <div className="avatar-circle">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <h2>Droguería Farma 30</h2>
            <p>Ingresa con tus credenciales</p>
          </div>

          <div className="login-tabs">
            <button
              className={`tab ${rolActivo === 'cliente' ? 'active' : ''}`}
              onClick={() => setTab('cliente')}
            >
              Cliente
            </button>
            <button
              className={`tab ${rolActivo === 'empleado' ? 'active' : ''}`}
              onClick={() => setTab('empleado')}
            >
              Empleado
            </button>
          </div>

          <div className="card login-card">
            {mostrarError && (
              <div className="alert alert-error" style={{ display: 'flex' }}>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div className="alert-body">
                  <h4>Nombre o contraseña incorrecto</h4>
                  <p>Vuelva a intentar</p>
                </div>
              </div>
            )}

            <div className="field">
              <label htmlFor="loginUser">Nombre o identificación del usuario</label>
              <input
                type="text"
                id="loginUser"
                placeholder="Ej: 10293847 o Juan Pérez"
                value={usuarioInput}
                onChange={(e) => {
                  setUsuarioInput(e.target.value);
                  setMostrarError(false);
                }}
              />
            </div>

            <div className="field">
              <label htmlFor="loginPass">Contraseña</label>
              <input
                type="password"
                id="loginPass"
                placeholder="••••••••"
                value={claveInput}
                onChange={(e) => {
                  setClaveInput(e.target.value);
                  setMostrarError(false);
                }}
              />
            </div>

            <button className="btn btn-primary btn-login" onClick={tryLogin}>
              INICIAR SESIÓN
            </button>

            <div className="forgot-link">
              ¿Olvidó su contraseña? <a onClick={recuperarClave}>Recuperar</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
