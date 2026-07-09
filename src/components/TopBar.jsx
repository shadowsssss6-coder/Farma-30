import { Link } from 'react-router-dom';

/**
 * Barra superior reutilizable, común a los 15 módulos del sistema.
 * Sustituye el <header class="top-bar"> que estaba duplicado de forma
 * idéntica en cada archivo HTML del prototipo original, centralizando
 * su codificación en un único componente de React.
 *
 * @param {string} rf - Código del requerimiento funcional (ej. "RF01").
 * @param {string} titulo - Título visible del módulo.
 * @param {string} [prev] - Ruta interna del módulo anterior (opcional).
 * @param {string} [next] - Ruta interna del módulo siguiente (opcional).
 */
export default function TopBar({ rf, titulo, prev, next, nextLabel = 'Siguiente →', prevLabel = '← Anterior' }) {
  return (
    <header className="top-bar">
      <span className="rf-tag">{rf}</span>
      <span className="top-title">{titulo}</span>
      {prev && (
        <Link className="nav-btn" to={prev}>
          {prevLabel}
        </Link>
      )}
      {next && (
        <Link className="nav-btn" to={next}>
          {nextLabel}
        </Link>
      )}
    </header>
  );
}
