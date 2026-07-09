import { useState, useMemo } from 'react';
import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import { CATALOGO, formatPrecio, resaltarTexto } from '../utils/globalUtils.js';
import '../styles/busqueda.css';

const CATEGORIAS = ['Todos', 'Analgésico', 'Antibiótico', 'Alérgico', 'Gastro', 'Vitamina', 'Cardiovascular', 'Diabetes'];
const PILL_SVG_PATH = 'M10.5 3.5a6 6 0 0 1 8.485 8.485L10.5 20.485 2.015 12A6 6 0 0 1 10.5 3.5z';

/** Renderiza el resultado de resaltarTexto() como fragmentos JSX. */
function TextoResaltado({ texto, query }) {
  const partes = resaltarTexto(texto, query);
  return partes.map((p) =>
    typeof p === 'string' ? p : p.resaltado ? <span className="highlight" key={p.key}>{p.texto}</span> : <span key={p.key}>{p.texto}</span>
  );
}

/**
 * RF14 - Búsqueda Avanzada.
 * Permite buscar medicamentos por nombre o categoría, combinando el
 * texto ingresado con un filtro rápido por categoría (chips).
 */
export default function RF14Busqueda() {
  const [query, setQuery] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState(null); // null = "Todos"
  const { mostrarToast } = useToast();

  const resultados = useMemo(() => {
    const q = query.toLowerCase();
    return CATALOGO.filter(
      (m) =>
        (!q || m.name.toLowerCase().includes(q) || m.cat.toLowerCase().includes(q)) &&
        (!categoriaActiva || m.cat === categoriaActiva)
    );
  }, [query, categoriaActiva]);

  return (
    <>
      <TopBar rf="RF14" titulo="Barra de Búsqueda" prev="/rf13-horarios" next="/rf15-scanner" />

      <main className="page" style={{ maxWidth: '820px' }}>
        <div className="page-title">RF14 · Búsqueda Avanzada</div>
        <div className="page-sub">Busca medicamentos por nombre o categoría</div>

        <div className="search-hero">
          <h2>Busca tu medicamento</h2>
          <input
            type="text"
            className="hero-input"
            placeholder="Ej: Amoxicilina, Antibiótico..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="chips">
          {CATEGORIAS.map((c) => (
            <div
              key={c}
              className={`chip ${(c === 'Todos' && !categoriaActiva) || categoriaActiva === c ? 'active' : ''}`}
              onClick={() => setCategoriaActiva(c === 'Todos' ? null : c)}
            >
              {c}
            </div>
          ))}
        </div>

        {resultados.length === 0 ? (
          <div className="no-results">No se encontraron resultados</div>
        ) : (
          <div>
            {resultados.map((m) => (
              <div className="result-item" key={m.id}>
                <div className="result-img">
                  <svg viewBox="0 0 24 24" fill="#3498db" opacity="0.6">
                    <path d={PILL_SVG_PATH} />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="result-name">
                    <TextoResaltado texto={m.name} query={query} />
                  </div>
                  <div className="result-detail">
                    {m.cat} &nbsp;·&nbsp; Stock: {m.stock} uds
                  </div>
                </div>
                <div className="result-price">{formatPrecio(m.price)}</div>
                <button className="btn btn-primary btn-sm" onClick={() => mostrarToast('Ver: ' + m.name, 'info')}>
                  Ver
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
