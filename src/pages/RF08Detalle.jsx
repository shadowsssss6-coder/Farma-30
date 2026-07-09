import { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import '../styles/detalle.css';

const PERIODOS = ['Hoy', 'Esta semana', 'Este mes', 'Rango personalizado'];

const VENTAS = [
  { hora: '09:14 AM', med: 'Amoxicilina 500mg x2', empleado: 'Carlos R.', pago: 'Efectivo', pagoCls: 'badge-green', val: '$37.000' },
  { hora: '10:32 AM', med: 'Ibuprofeno 400mg + Loratadina 10mg', empleado: 'María S.', pago: 'Tarjeta', pagoCls: 'badge-blue', val: '$20.500' },
  { hora: '11:58 AM', med: 'Vitamina C 500mg x3', empleado: 'Carlos R.', pago: 'Transferencia', pagoCls: 'badge-purple', val: '$28.500' },
  { hora: '02:15 PM', med: 'Omeprazol 20mg x1 + Metformina x2', empleado: 'Ana L.', pago: 'Efectivo', pagoCls: 'badge-green', val: '$59.000' },
  { hora: '03:47 PM', med: 'Amoxicilina x1 + Ibuprofeno x3', empleado: 'Carlos R.', pago: 'Tarjeta', pagoCls: 'badge-blue', val: '$54.500' },
];

/**
 * RF08 - Detalle de Ventas.
 * Presenta el historial cronológico de transacciones, filtrable por
 * periodo (Hoy, Esta semana, Este mes, Rango personalizado).
 */
export default function RF08Detalle() {
  const [periodoActivo, setPeriodoActivo] = useState('Hoy');
  const { mostrarToast } = useToast();

  const fecha = new Date();
  const resumenTitulo =
    periodoActivo === 'Hoy'
      ? 'Total del día – ' +
        fecha.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
      : 'Total – ' + periodoActivo + ' (' + fecha.toLocaleDateString('es-CO') + ')';

  return (
    <>
      <TopBar rf="RF08" titulo="Detalle de Ventas" prev="/rf07-vencimientos" next="/rf09-notificaciones" />

      <main className="page" style={{ maxWidth: '820px' }}>
        <div className="page-title">RF08 · Detalle de Ventas</div>
        <div className="page-sub">Historial cronológico de transacciones</div>

        <div className="period-tabs">
          {PERIODOS.map((p) => (
            <button
              key={p}
              className={`ptab ${periodoActivo === p ? 'active' : ''}`}
              onClick={() => setPeriodoActivo(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="btn btn-outline btn-sm"
            style={{ marginLeft: 'auto' }}
            onClick={() => mostrarToast('Exportando PDF...', 'info')}
          >
            Exportar PDF
          </button>
        </div>

        <div className="total-summary card">
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>{resumenTitulo}</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>47 transacciones · 312 unidades</div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#2c3e50' }}>$4.280.000</div>
        </div>

        <div className="card">
          <div className="card-title">Línea de tiempo de ventas</div>
          <div className="timeline">
            {VENTAS.map((v, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-dot" />
                <div className="tl-time">{v.hora}</div>
                <div className="tl-med">{v.med}</div>
                <div className="tl-detail">
                  {v.empleado} &nbsp;·&nbsp; <span className={`badge ${v.pagoCls}`}>{v.pago}</span>
                </div>
                <div className="tl-val">{v.val}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
