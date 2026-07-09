import { Routes, Route, Navigate } from 'react-router-dom';

import RF01Login from './pages/RF01Login.jsx';
import RF02Inventario from './pages/RF02Inventario.jsx';
import RF03Ventas from './pages/RF03Ventas.jsx';
import RF04Gestion from './pages/RF04Gestion.jsx';
import RF05Deseados from './pages/RF05Deseados.jsx';
import RF06Registro from './pages/RF06Registro.jsx';
import RF07Vencimientos from './pages/RF07Vencimientos.jsx';
import RF08Detalle from './pages/RF08Detalle.jsx';
import RF09Notificaciones from './pages/RF09Notificaciones.jsx';
import RF10Descuentos from './pages/RF10Descuentos.jsx';
import RF11Promos from './pages/RF11Promos.jsx';
import RF12EmpDescuentos from './pages/RF12EmpDescuentos.jsx';
import RF13Horarios from './pages/RF13Horarios.jsx';
import RF14Busqueda from './pages/RF14Busqueda.jsx';
import RF15Scanner from './pages/RF15Scanner.jsx';
import RutaProtegida from './components/RutaProtegida.jsx';

/**
 * Componente raíz de la aplicación. Define las 15 rutas del sistema,
 * una por cada requerimiento funcional (RF01-RF15) del proyecto Farma 30,
 * equivalentes a los 15 archivos HTML independientes del prototipo original.
 *
 * La ruta raíz "/" redirige al módulo de inicio de sesión (RF01).
 * Las demás rutas quedan protegidas por sesión activa, replicando el
 * comportamiento de control de acceso definido en los casos de uso
 * del proyecto.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/rf01-login" replace />} />
      <Route path="/rf01-login" element={<RF01Login />} />

      <Route path="/rf02-inventario" element={<RutaProtegida><RF02Inventario /></RutaProtegida>} />
      <Route path="/rf03-ventas" element={<RutaProtegida><RF03Ventas /></RutaProtegida>} />
      <Route path="/rf04-gestion" element={<RutaProtegida><RF04Gestion /></RutaProtegida>} />
      <Route path="/rf05-deseados" element={<RutaProtegida><RF05Deseados /></RutaProtegida>} />
      <Route path="/rf06-registro" element={<RutaProtegida><RF06Registro /></RutaProtegida>} />
      <Route path="/rf07-vencimientos" element={<RutaProtegida><RF07Vencimientos /></RutaProtegida>} />
      <Route path="/rf08-detalle" element={<RutaProtegida><RF08Detalle /></RutaProtegida>} />
      <Route path="/rf09-notificaciones" element={<RutaProtegida><RF09Notificaciones /></RutaProtegida>} />
      <Route path="/rf10-descuentos" element={<RutaProtegida><RF10Descuentos /></RutaProtegida>} />
      <Route path="/rf11-promos" element={<RutaProtegida><RF11Promos /></RutaProtegida>} />
      <Route path="/rf12-emp-descuentos" element={<RutaProtegida><RF12EmpDescuentos /></RutaProtegida>} />
      <Route path="/rf13-horarios" element={<RutaProtegida><RF13Horarios /></RutaProtegida>} />
      <Route path="/rf14-busqueda" element={<RutaProtegida><RF14Busqueda /></RutaProtegida>} />
      <Route path="/rf15-scanner" element={<RutaProtegida><RF15Scanner /></RutaProtegida>} />

      <Route path="*" element={<Navigate to="/rf01-login" replace />} />
    </Routes>
  );
}
