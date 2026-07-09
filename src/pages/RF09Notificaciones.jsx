import { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import '../styles/notificaciones.css';

const NOTIFS_INICIALES = [
  { icon: '🔴', bg: '#fadbd8', title: 'Medicamento vencido', desc: 'Clorfenamina 4mg – Lote 2024-A venció hace 2 días.', time: 'Hace 5 min', unread: true },
  { icon: '🟡', bg: '#fef9e7', title: 'Factura próxima a vencer', desc: 'Factura #F-2026-0312 del proveedor Almamedica vence en 3 días.', time: 'Hace 18 min', unread: true },
  { icon: '🔵', bg: '#d6eaf8', title: 'Stock crítico', desc: 'Omeprazol 20mg tiene solo 12 unidades. Pedido urgente.', time: 'Hace 1h', unread: true },
  { icon: '🟢', bg: '#d5f5e3', title: 'Inventario actualizado', desc: 'Carlos R. realizó 3 modificaciones al inventario.', time: 'Hace 2h', unread: false },
  { icon: '🟣', bg: '#e8daef', title: 'Descuento aplicado', desc: '20% en Vitamina C 500mg. Válido hasta 10 Mar 2026.', time: 'Hace 3h', unread: false },
];

const FILTROS = ['Todas', 'Sin leer', 'Alertas', 'Información'];

/**
 * RF09 - Notificaciones del Sistema.
 * Muestra alertas y avisos generados automáticamente, permitiendo
 * filtrarlos, cerrarlos individualmente o marcarlos todos como leídos.
 */
export default function RF09Notificaciones() {
  const [notifs, setNotifs] = useState(NOTIFS_INICIALES);
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const { mostrarToast } = useToast();

  const sinLeer = notifs.filter((n) => n.unread).length;

  // Se conserva el índice original de cada notificación antes de filtrar,
  // para poder eliminarla correctamente sin importar el filtro activo.
  const listaConIndice = notifs.map((n, i) => ({ ...n, indiceOriginal: i }));
  const listaVisible = filtroActivo === 'Sin leer' ? listaConIndice.filter((n) => n.unread) : listaConIndice;

  function cerrar(indiceOriginal) {
    setNotifs(notifs.filter((_, i) => i !== indiceOriginal));
  }

  function marcarTodas() {
    setNotifs(notifs.map((n) => ({ ...n, unread: false })));
    mostrarToast('Todas marcadas como leídas', 'info');
  }

  return (
    <>
      <TopBar rf="RF09" titulo="Notificaciones del Sistema" prev="/rf08-detalle" next="/rf10-descuentos" />

      <main className="page" style={{ maxWidth: '720px' }}>
        <div className="page-title">RF09 · Notificaciones del Sistema</div>
        <div className="page-sub">Alertas y avisos generados automáticamente</div>

        <div className="notif-header">
          <span className="unread-badge">{sinLeer} sin leer</span>
          <button className="btn btn-outline btn-sm" onClick={marcarTodas}>
            Marcar todas como leídas
          </button>
        </div>

        <div className="filter-tabs">
          {FILTROS.map((f) => (
            <button
              key={f}
              className={`ftab ${filtroActivo === f ? 'active' : ''}`}
              onClick={() => setFiltroActivo(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div>
          {listaVisible.map((n) => (
            <div className={`notif-item ${n.unread ? 'unread' : ''}`} key={n.indiceOriginal}>
              <div className="notif-icon" style={{ backgroundColor: n.bg }}>
                {n.icon}
              </div>
              <div className="notif-body">
                <div className="notif-title">{n.title}</div>
                <div className="notif-desc">{n.desc}</div>
                <div className="notif-actions">
                  <button className="btn-close" onClick={() => cerrar(n.indiceOriginal)}>
                    Cerrar
                  </button>
                  <button className="btn-detail">Ver detalle</button>
                </div>
              </div>
              <div className="notif-right">
                <div className="notif-time">{n.time}</div>
                {n.unread && <div className="notif-dot" />}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
