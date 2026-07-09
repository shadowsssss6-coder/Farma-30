import { createContext, useCallback, useContext, useState } from 'react';

/**
 * Contexto de notificaciones (toast) del sistema.
 * Reemplaza la función mostrarToast(mensaje, tipo) de shared/global.js,
 * que manipulaba el DOM directamente, por un componente controlado
 * mediante estado de React.
 */
const ToastContext = createContext(null);

const COLORES = {
  success: '#27ae60',
  error: '#e74c3c',
  info: '#3498db',
};

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  /**
   * Muestra un toast de confirmación temporal.
   * @param {string} mensaje - Texto a mostrar.
   * @param {'success'|'error'|'info'} tipo - Tipo de mensaje.
   */
  const mostrarToast = useCallback((mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
    setTimeout(() => setToast(null), 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      {toast && (
        <div
          className="toast"
          style={{ display: 'block', backgroundColor: COLORES[toast.tipo] || COLORES.success }}
        >
          {toast.mensaje}
        </div>
      )}
    </ToastContext.Provider>
  );
}

/** Hook de acceso al sistema de notificaciones desde cualquier componente. */
export function useToast() {
  return useContext(ToastContext);
}
