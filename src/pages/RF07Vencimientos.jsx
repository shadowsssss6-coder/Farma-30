import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import '../styles/vencimientos.css';

const ALERTAS = [
  { tipo: 'critico', icon: '⚠️', bg: '#fadbd8', name: 'Clorfenamina 4mg', detail: 'Venció: 05 Ene 2026 · Lote 2024-A · 48 unidades', badge: 'badge-red', badgeTxt: 'Vencido', btnTxt: 'Retirar', btnCls: 'btn-danger' },
  { tipo: 'critico', icon: '⚠️', bg: '#fadbd8', name: 'Aspirina 100mg', detail: 'Venció: 12 Feb 2026 · Lote 2023-B · 22 unidades', badge: 'badge-red', badgeTxt: 'Vencido', btnTxt: 'Retirar', btnCls: 'btn-danger' },
  { tipo: 'proximo', icon: '⏰', bg: '#fdebd0', name: 'Omeprazol 20mg', detail: 'Vence: 25 Mar 2026 · 12 días restantes · 12 uds', badge: 'badge-orange', badgeTxt: '12 días', btnTxt: 'Gestionar', btnCls: 'btn-outline' },
  { tipo: 'proximo', icon: '⏰', bg: '#fdebd0', name: 'Loratadina 10mg (L)', detail: 'Vence: 28 Mar 2026 · 15 días restantes · 35 uds', badge: 'badge-orange', badgeTxt: '15 días', btnTxt: 'Gestionar', btnCls: 'btn-outline' },
  { tipo: 'bajo', icon: '📦', bg: '#d6eaf8', name: 'Metformina 850mg', detail: '180 unidades · Baja rotación · Vence Nov 2026', badge: 'badge-blue', badgeTxt: 'Baja rot.', btnTxt: 'Pedir', btnCls: 'btn-primary' },
];

const GRUPOS = [
  { tipo: 'critico', label: '🔴 Crítico – Vencidos' },
  { tipo: 'proximo', label: '🟠 Próximos a vencer (menos de 30 días)' },
  { tipo: 'bajo', label: '🔵 Baja rotación' },
];

/**
 * RF07 - Alertas de Vencimiento.
 * Agrupa y muestra los medicamentos vencidos, próximos a vencer y de
 * baja rotación, permitiendo tomar acciones rápidas sobre cada uno.
 */
export default function RF07Vencimientos() {
  const { mostrarToast } = useToast();

  function accion(nombre, tipoAccion) {
    mostrarToast(tipoAccion + ': ' + nombre, tipoAccion === 'Retirar' ? 'error' : 'info');
  }

  const resumen = [
    { color: '#e74c3c', total: ALERTAS.filter((a) => a.tipo === 'critico').length, label: 'Vencidos' },
    { color: '#e67e22', total: ALERTAS.filter((a) => a.tipo === 'proximo').length, label: 'Próximos a vencer' },
    { color: '#3498db', total: ALERTAS.filter((a) => a.tipo === 'bajo').length, label: 'Baja rotación' },
  ];

  return (
    <>
      <TopBar rf="RF07" titulo="Alertas de Vencimiento" prev="/rf06-registro" next="/rf08-detalle" />

      <main className="page">
        <div className="page-title">RF07 · Alertas de Vencimiento</div>
        <div className="page-sub">Control de medicamentos vencidos, próximos a vencer y de baja rotación</div>

        <div className="grid3">
          {resumen.map((r, i) => (
            <div className="resumen-card" key={i}>
              <div className="resumen-count" style={{ color: r.color }}>
                {r.total}
              </div>
              <div className="resumen-label">{r.label}</div>
            </div>
          ))}
        </div>

        <div>
          {GRUPOS.map((grupo) => {
            const lista = ALERTAS.filter((a) => a.tipo === grupo.tipo);
            if (lista.length === 0) return null;
            return (
              <div key={grupo.tipo}>
                <div className="section-lbl">{grupo.label}</div>
                {lista.map((a, i) => (
                  <div className={`venc-item ${a.tipo}`} key={i}>
                    <div className="venc-circle" style={{ backgroundColor: a.bg }}>
                      {a.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="venc-name">{a.name}</div>
                      <div className="venc-detail">{a.detail}</div>
                    </div>
                    <span className={`badge ${a.badge}`}>{a.badgeTxt}</span>
                    <button className={`btn ${a.btnCls} btn-sm`} onClick={() => accion(a.name, a.btnTxt)}>
                      {a.btnTxt}
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
