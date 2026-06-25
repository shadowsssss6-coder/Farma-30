/* RF09 - Notificaciones */
let notifs = [
  { icon:'🔴', bg:'#fadbd8', title:'Medicamento vencido',       desc:'Clorfenamina 4mg – Lote 2024-A venció hace 2 días.', time:'Hace 5 min',  unread:true  },
  { icon:'🟡', bg:'#fef9e7', title:'Factura próxima a vencer',   desc:'Factura #F-2026-0312 del proveedor Almamedica vence en 3 días.', time:'Hace 18 min', unread:true  },
  { icon:'🔵', bg:'#d6eaf8', title:'Stock crítico',              desc:'Omeprazol 20mg tiene solo 12 unidades. Pedido urgente.', time:'Hace 1h',    unread:true  },
  { icon:'🟢', bg:'#d5f5e3', title:'Inventario actualizado',     desc:'Carlos R. realizó 3 modificaciones al inventario.', time:'Hace 2h',    unread:false },
  { icon:'🟣', bg:'#e8daef', title:'Descuento aplicado',         desc:'20% en Vitamina C 500mg. Válido hasta 10 Mar 2026.', time:'Hace 3h',    unread:false },
];
const filtros = ['Todas','Sin leer','Alertas','Información'];
let filtroActivo = 'Todas';

function renderFiltros() {
  document.getElementById('filterTabs').innerHTML =
    filtros.map(f => `<button class="ftab ${f===filtroActivo?'active':''}" onclick="setFiltro(this,'${f}')">${f}</button>`).join('');
}

function setFiltro(el, f) {
  filtroActivo = f;
  document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  render();
}

function render() {
  let lista = notifs;
  if (filtroActivo === 'Sin leer') lista = notifs.filter(n => n.unread);
  const sinLeer = notifs.filter(n => n.unread).length;
  document.getElementById('unreadBadge').textContent = sinLeer + ' sin leer';
  document.getElementById('notifList').innerHTML = lista.map((n,i) => `
    <div class="notif-item ${n.unread?'unread':''}" id="notif-${i}">
      <div class="notif-icon" style="background-color:${n.bg}">${n.icon}</div>
      <div class="notif-body">
        <div class="notif-title">${n.title}</div>
        <div class="notif-desc">${n.desc}</div>
        <div class="notif-actions">
          <button class="btn-close" onclick="cerrar(${i})">Cerrar</button>
          <button class="btn-detail">Ver detalle</button>
        </div>
      </div>
      <div class="notif-right">
        <div class="notif-time">${n.time}</div>
        ${n.unread?'<div class="notif-dot"></div>':''}
      </div>
    </div>`).join('');
}

function cerrar(i) { notifs.splice(i,1); render(); }
function marcarTodas() { notifs.forEach(n => n.unread = false); render(); mostrarToast('Todas marcadas como leídas','info'); }

renderFiltros(); render();