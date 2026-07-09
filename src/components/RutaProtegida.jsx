import { Navigate } from 'react-router-dom';
import { useSesion } from '../utils/SesionContext.jsx';

/**
 * Envuelve una ruta protegida, verificando que exista una sesión
 * activa antes de renderizar el módulo solicitado. Equivalente al
 * control de acceso implementado en los módulos backend (Servlets/PHP)
 * de fases anteriores del proyecto, aplicado aquí del lado del cliente.
 */
export default function RutaProtegida({ children }) {
  const { usuario } = useSesion();

  if (!usuario) {
    return <Navigate to="/rf01-login" replace />;
  }

  return children;
}
