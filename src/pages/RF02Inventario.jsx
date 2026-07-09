import { useState, useMemo } from 'react';
import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import { CATALOGO, formatPrecio } from '../utils/globalUtils.js';
import '../styles/inventario.css';

const PILL_SVG_PATH = 'M10.5 3.5a6 6 0 0 1 8.485 8.485L10.5 20.485 2.015 12A6 6 0 0 1 10.5 3.5z';

/**
 * RF02 - Consulta de Inventario.
 * Muestra el catálogo de medicamentos disponibles, permite buscar por
 * nombre/categoría y marcar productos como "deseados" (lista de deseos
 * usada por el módulo RF05).
 */
export default function RF02Inventario() {
  const [busqueda, setBusqueda] = useState('');
  const [deseados, setDeseados] = useState(() => {
    const guardado = sessionStorage.getItem('deseados');
    return guardado ? JSON.parse(guardado) : [];
  });
  const { mostrarToast } = useToast();

  // Filtra el catálogo por nombre o categoría según el texto de búsqueda
  const medicamentosFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase();
    return CATALOGO.filter(
      (m) => m.name.toLowerCase().includes(q) || m.cat.toLowerCase().includes(q)
    );
  }, [busqueda]);

  /** Limpia el campo de búsqueda, mostrando de nuevo todo el catálogo. */
  function limpiarBusqueda() {
    setBusqueda('');
  }

  /** Agrega o quita un medicamento de la lista de deseados. */
  function toggleWish(e, id) {
    e.stopPropagation();
    const yaExiste = deseados.includes(id);
    const nuevaLista = yaExiste ? deseados.filter((d) => d !== id) : [...deseados, id];

    setDeseados(nuevaLista);
    sessionStorage.setItem('deseados', JSON.stringify(nuevaLista));
    mostrarToast(
      yaExiste ? 'Eliminado de la lista de deseados' : 'Agregado a la lista de deseados ❤️',
      yaExiste ? 'info' : 'success'
    );
  }

  return (
    <>
      <TopBar rf="RF02" titulo="Consulta de Inventario" prev="/rf01-login" next="/rf03-ventas" />

      <main className="page">
        <div className="page-title">RF02 · Consulta de Inventario</div>
        <div className="page-sub">Revisa los medicamentos disponibles en la droguería</div>

        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Buscar medicamento..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn btn-outline" onClick={limpiarBusqueda}>
            Limpiar
          </button>
        </div>

        <div className="med-grid">
          {medicamentosFiltrados.length === 0 ? (
            <div className="no-results">No se encontraron medicamentos</div>
          ) : (
            medicamentosFiltrados.map((m) => {
              const esDeseado = deseados.includes(m.id);
              const stockTxt = m.stock > 0 ? `✓ ${m.stock} uds` : '✗ Agotado';
              const stockCls = m.stock > 0 ? '' : 'agotado';
              const badgeCls =
                m.estado === 'ok' ? 'badge-green' : m.estado === 'bajo' ? 'badge-orange' : 'badge-red';
              const badgeTxt = m.estado === 'ok' ? 'OK' : m.estado === 'bajo' ? 'Bajo' : 'Agot.';

              return (
                <div className="med-card" key={m.id}>
                  <button className="wish-btn" onClick={(e) => toggleWish(e, m.id)}>
                    {esDeseado ? '❤️' : '🤍'}
                  </button>
                  <div className="med-img">
                    <svg viewBox="0 0 24 24" fill="#3498db" opacity="0.6">
                      <path d={PILL_SVG_PATH} />
                    </svg>
                  </div>
                  <div className="med-name">{m.name}</div>
                  <div className="med-cat">{m.cat}</div>
                  <div className="med-footer">
                    <div>
                      <div className="med-price">{formatPrecio(m.price)}</div>
                      <div className={`med-stock ${stockCls}`}>{stockTxt}</div>
                    </div>
                    <span className={`badge ${badgeCls}`}>{badgeTxt}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
