import { createContext, useContext, useState } from 'react';

/**
 * Contexto de sesión del usuario autenticado.
 * Reemplaza el uso directo de sessionStorage del prototipo original
 * por un estado de React compartido entre todos los módulos,
 * manteniendo también sessionStorage como respaldo de persistencia
 * entre recargas de página.
 */
const SesionContext = createContext(null);

export function SesionProvider({ children }) {
  const [usuario, setUsuarioState] = useState(() => sessionStorage.getItem('usuario'));
  const [rol, setRolState] = useState(() => sessionStorage.getItem('rol'));

  /** Guarda la sesión activa tras un inicio de sesión exitoso. */
  function iniciarSesion(usuarioLogin, rolLogin) {
    sessionStorage.setItem('usuario', usuarioLogin);
    sessionStorage.setItem('rol', rolLogin);
    setUsuarioState(usuarioLogin);
    setRolState(rolLogin);
  }

  /** Elimina la sesión activa (cierre de sesión). */
  function cerrarSesion() {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('rol');
    setUsuarioState(null);
    setRolState(null);
  }

  return (
    <SesionContext.Provider value={{ usuario, rol, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  );
}

/** Hook de acceso al contexto de sesión desde cualquier componente. */
export function useSesion() {
  return useContext(SesionContext);
}
