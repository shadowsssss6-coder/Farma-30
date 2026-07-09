import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import '../styles/promos.css';

const PROMOS = [
  { pct: '20%', med: 'Vitamina C 500mg', desc: 'Caja x30 tabletas', exp: '10 Mar 2026', urgente: false },
  { pct: '10%', med: 'Loratadina 10mg', desc: 'Tabletas x10', exp: '14 Mar 2026', urgente: false },
  { pct: '15%', med: 'Ibuprofeno 400mg', desc: 'Caja x10 tabletas', exp: '15 Mar 2026', urgente: false },
  { pct: '25%', med: 'Amoxicilina 500mg', desc: 'Cápsulas x12', exp: '13 Mar 2026', urgente: true },
  { pct: '5%', med: 'Metformina 850mg', desc: 'Tabletas x30', exp: '20 Mar 2026', urgente: false },
  { pct: '12%', med: 'Omeprazol 20mg', desc: 'Cápsulas x14', exp: '18 Mar 2026', urgente: false },
];

/**
 * RF11 - Descuentos para Clientes.
 * Vitrina pública de promociones activas, visible para el rol Cliente.
 */
export default function RF11Promos() {
  const { mostrarToast } = useToast();

  return (
    <>
      <TopBar rf="RF11" titulo="Descuentos para Clientes" prev="/rf10-descuentos" next="/rf12-emp-descuentos" />

      <main className="page">
        <div className="page-title">RF11 · Descuentos para Clientes</div>
        <div className="page-sub">Promociones activas disponibles en Droguería Farma 30</div>

        <div className="banner">
          <h2>¡Ofertas especiales de la semana!</h2>
          <p>Aprovecha los descuentos en medicamentos seleccionados</p>
        </div>

        <div className="promo-grid">
          {PROMOS.map((p, i) => (
            <div className="promo-card" key={i}>
              {p.urgente && (
                <span className="badge badge-red" style={{ marginBottom: '6px', display: 'inline-block' }}>
                  Último día
                </span>
              )}
              <div className="promo-pct">{p.pct}</div>
              <div className="promo-off">DESCUENTO</div>
              <div className="promo-med">{p.med}</div>
              <div className="promo-desc">{p.desc}</div>
              <div className={`promo-exp ${p.urgente ? 'urgente' : ''}`}>Válido hasta: {p.exp}</div>
              <button
                className="btn btn-primary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => mostrarToast('Ver oferta: ' + p.med, 'info')}
              >
                Ver oferta
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
