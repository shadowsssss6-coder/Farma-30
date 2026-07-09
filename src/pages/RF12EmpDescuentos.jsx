import { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import '../styles/emp_descuentos.css';

const OFERTAS_INICIALES = [
  { pct: '30%', prov: 'Almamedica S.A.', med: 'Amoxicilina 500mg x1000', desc: 'Descuento por volumen en pedidos mayores a $5M', exp: '15 Mar 2026' },
  { pct: '18%', prov: 'Distribuciones Pharma', med: 'Ibuprofeno 400mg x500', desc: 'Oferta de temporada para antiinflamatorios', exp: '12 Mar 2026' },
  { pct: '25%', prov: 'LaboBogotá Ltda.', med: 'Metformina 850mg x200', desc: 'Descuento especial por cierre de lote próximo a vencer', exp: '20 Mar 2026' },
  { pct: '12%', prov: 'Farmacias Central', med: 'Loratadina 10mg x300', desc: 'Renovación de inventario con precio especial', exp: '18 Mar 2026' },
];

/**
 * RF12 - Descuentos para Empleados.
 * Muestra ofertas de proveedores recibidas para pedidos internos,
 * visibles únicamente para el rol Empleado.
 */
export default function RF12EmpDescuentos() {
  const [ofertas, setOfertas] = useState(OFERTAS_INICIALES);
  const { mostrarToast } = useToast();

  function pedir(i) {
    mostrarToast('Iniciando pedido a ' + ofertas[i].prov);
  }

  function ignorar(i) {
    setOfertas(ofertas.filter((_, idx) => idx !== i));
    mostrarToast('Oferta ignorada', 'info');
  }

  return (
    <>
      <TopBar rf="RF12" titulo="Descuentos para Empleados" prev="/rf11-promos" next="/rf13-horarios" />

      <main className="page" style={{ maxWidth: '820px' }}>
        <div className="page-title">RF12 · Descuentos para Empleados</div>
        <div className="page-sub">Ofertas recibidas de proveedores con precios especiales</div>

        {ofertas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#aaa' }}>
            No hay ofertas disponibles en este momento
          </div>
        ) : (
          <div>
            {ofertas.map((e, i) => (
              <div className="emp-notif" key={i}>
                <div className="emp-badge">
                  {e.pct}
                  <br />
                  OFF
                </div>
                <div style={{ flex: 1 }}>
                  <div className="emp-prov">{e.prov}</div>
                  <div className="emp-med">{e.med}</div>
                  <div className="emp-desc">{e.desc}</div>
                  <div className="emp-vence">Vence: {e.exp}</div>
                </div>
                <div className="btn-group">
                  <button className="btn btn-primary btn-sm" onClick={() => pedir(i)}>
                    Pedir
                  </button>
                  <button className="btn btn-outline btn-sm" onClick={() => ignorar(i)}>
                    Ignorar
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
