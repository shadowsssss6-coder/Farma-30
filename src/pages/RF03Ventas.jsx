import TopBar from '../components/TopBar.jsx';
import '../styles/ventas.css';

const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const DATOS_VENTAS = [3200000, 4100000, 2800000, 4280000, 3600000, 2200000, 1500000];

const KPIS = [
  {
    color: '#3498db',
    icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    val: '$4.280.000',
    label: 'Ventas del día',
    trend: 'up',
    txt: '▲ +12% vs ayer',
  },
  {
    color: '#27ae60',
    icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    val: '47',
    label: 'Transacciones',
    trend: 'up',
    txt: '▲ +5% vs ayer',
  },
  {
    color: '#e67e22',
    icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>',
    val: '312',
    label: 'Unidades vendidas',
    trend: 'down',
    txt: '▼ -3% vs ayer',
  },
  {
    color: '#e74c3c',
    icon: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>',
    val: '3',
    label: 'Productos vencidos',
    trend: 'down',
    txt: '▼ Atención',
  },
];

const TOP_MEDS = [
  ['Amoxicilina 500mg', '48', '$888.000'],
  ['Ibuprofeno 400mg', '35', '$420.000'],
  ['Loratadina 10mg', '28', '$238.000'],
  ['Vitamina C 500mg', '22', '$209.000'],
  ['Omeprazol 20mg', '18', '$270.000'],
];

/**
 * RF03 - Resumen de Ventas.
 * Presenta indicadores clave (KPIs) del día, un gráfico de barras de
 * los últimos 7 días y una tabla de los productos más vendidos.
 * Los datos son simulados (en producción vendrían de una consulta
 * agregada al backend/API de ventas).
 */
export default function RF03Ventas() {
  const hoy = new Date();
  const fechaTexto =
    'Métricas del día – ' +
    hoy.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const maxVenta = Math.max(...DATOS_VENTAS);

  return (
    <>
      <TopBar rf="RF03" titulo="Resumen de Ventas" prev="/rf02-inventario" next="/rf04-gestion" />

      <main className="page">
        <div className="page-title">RF03 · Resumen de Ventas</div>
        <div className="page-sub">{fechaTexto}</div>

        <div className="grid4">
          {KPIS.map((k, i) => (
            <div className="kpi" key={i}>
              <div className="kpi-icon" style={{ backgroundColor: k.color }}>
                {/* Iconos SVG decorativos generados por el propio proyecto (contenido confiable) */}
                <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: k.icon }} />
              </div>
              <div className="kpi-val">{k.val}</div>
              <div className="kpi-label">{k.label}</div>
              <div className={`kpi-trend ${k.trend}`}>{k.txt}</div>
            </div>
          ))}
        </div>

        <div className="grid2" style={{ marginTop: '16px' }}>
          <div className="card">
            <div className="card-title">Ventas últimos 7 días</div>
            <div className="mini-bar">
              {DATOS_VENTAS.map((v, i) => (
                <div className="bar-col" key={i}>
                  <div
                    className="bar-fill"
                    style={{
                      height: `${(v / maxVenta) * 90}px`,
                      backgroundColor: i === 3 ? '#3498db' : '#aed6f1',
                    }}
                  />
                  <div className="bar-day">{DIAS[i]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Productos más vendidos hoy</div>
            <table>
              <thead>
                <tr>
                  <th>Medicamento</th>
                  <th>Uds</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {TOP_MEDS.map((r, i) => (
                  <tr key={i}>
                    <td>{r[0]}</td>
                    <td>{r[1]}</td>
                    <td style={{ fontWeight: 'bold', color: '#3498db' }}>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
