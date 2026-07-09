import { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import { CATALOGO, formatPrecio } from '../utils/globalUtils.js';
import '../styles/deseados.css';

const DESCUENTOS = { 5: '20% OFF' };
const PILL_SVG_PATH = 'M10.5 3.5a6 6 0 0 1 8.485 8.485L10.5 20.485 2.015 12A6 6 0 0 1 10.5 3.5z';

/**
 * RF05 - Lista de Deseados.
 * Muestra los medicamentos que el usuario marcó como deseados desde
 * el módulo RF02, permitiendo eliminarlos, vaciarlos o "comprarlos"
 * (simulado).
 */
export default function RF05Deseados() {
  const [miLista, setMiLista] = useState(() => {
    const guardado = sessionStorage.getItem('deseados');
    if (!guardado) return [];
    const ids = JSON.parse(guardado);
    return CATALOGO.filter((m) => ids.includes(m.id));
  });
  const { mostrarToast } = useToast();

  function eliminar(i) {
    const nuevaLista = miLista.filter((_, idx) => idx !== i);
    setMiLista(nuevaLista);
    sessionStorage.setItem('deseados', JSON.stringify(nuevaLista.map((m) => m.id)));
    mostrarToast('Eliminado de la lista', 'info');
  }

  function comprar(i) {
    mostrarToast('Agregado al carrito: ' + miLista[i].name);
  }

  function vaciarLista() {
    if (confirm('¿Vaciar toda la lista?')) {
      setMiLista([]);
      sessionStorage.removeItem('deseados');
    }
  }

  return (
    <>
      <TopBar rf="RF05" titulo="Lista de Deseados" prev="/rf04-gestion" next="/rf06-registro" />

      <main className="page" style={{ maxWidth: '700px' }}>
        <div className="page-title">RF05 · Lista de Deseados</div>
        <div className="page-sub">Medicamentos guardados para compras futuras</div>

        <div className="summary-bar">
          <div>
            <div className="summary-count">{miLista.length}</div>
            <div style={{ fontSize: '13px', color: '#666' }}>productos guardados</div>
          </div>
          <button className="btn btn-danger btn-sm" onClick={vaciarLista}>
            Vaciar lista
          </button>
        </div>

        {miLista.length === 0 ? (
          <div className="empty-wish">
            Tu lista está vacía.
            <br />
            <Link to="/rf02-inventario">Explorar catálogo</Link>
          </div>
        ) : (
          <div>
            {miLista.map((m, i) => (
              <div className="wish-item" key={m.id}>
                <div className="wish-img">
                  <svg viewBox="0 0 24 24" fill="#3498db" opacity="0.6">
                    <path d={PILL_SVG_PATH} />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="wish-name">{m.name}</div>
                  <div className="wish-cat">{m.cat}</div>
                  <div className="wish-price">
                    {formatPrecio(m.price)}
                    {DESCUENTOS[m.id] && <span className="wish-disc">{DESCUENTOS[m.id]}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button className="btn btn-primary btn-sm" onClick={() => comprar(i)}>
                    Comprar
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{ background: '#fadbd8', color: '#e74c3c', border: 'none' }}
                    onClick={() => eliminar(i)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
