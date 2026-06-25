/* RF07 - Alertas de Vencimiento */
const alertas = [
  { tipo:'critico', icon:'⚠️', bg:'#fadbd8', name:'Clorfenamina 4mg',   detail:'Venció: 05 Ene 2026 · Lote 2024-A · 48 unidades', badge:'badge-red',    badgeTxt:'Vencido',   btnTxt:'Retirar',  btnCls:'btn-danger'  },
  { tipo:'critico', icon:'⚠️', bg:'#fadbd8', name:'Aspirina 100mg',     detail:'Venció: 12 Feb 2026 · Lote 2023-B · 22 unidades', badge:'badge-red',    badgeTxt:'Vencido',   btnTxt:'Retirar',  btnCls:'btn-danger'  },
  { tipo:'proximo', icon:'⏰', bg:'#fdebd0', name:'Omeprazol 20mg',      detail:'Vence: 25 Mar 2026 · 12 días restantes · 12 uds', badge:'badge-orange', badgeTxt:'12 días',   btnTxt:'Gestionar',btnCls:'btn-outline' },
  { tipo:'proximo', icon:'⏰', bg:'#fdebd0', name:'Loratadina 10mg (L)', detail:'Vence: 28 Mar 2026 · 15 días restantes · 35 uds', badge:'badge-orange', badgeTxt:'15 días',   btnTxt:'Gestionar',btnCls:'btn-outline' },
  { tipo:'bajo',    icon:'📦', bg:'#d6eaf8', name:'Metformina 850mg',    detail:'180 unidades · Baja rotación · Vence Nov 2026',   badge:'badge-blue',   badgeTxt:'Baja rot.', btnTxt:'Pedir',    btnCls:'btn-primary' },
];

const grupos = { critico:['🔴 Crítico – Vencidos','critico'], proximo:['🟠 Próximos a vencer (menos de 30 días)','proximo'], bajo:['🔵 Baja rotación','bajo'] };

document.getElementById('resumen').innerHTML = [
  ['#e74c3c', alertas.filter(a=>a.tipo==='critico').length, 'Vencidos'],
  ['#e67e22', alertas.filter(a=>a.tipo==='proximo').length, 'Próximos a vencer'],
  ['#3498db', alertas.filter(a=>a.tipo==='bajo').length,    'Baja rotación'],
].map(([c,n,l]) => `<div class="resumen-card"><div class="resumen-count" style="color:${c}">${n}</div><div class="resumen-label">${l}</div></div>`).join('');

let html = '';
Object.values(grupos).forEach(([lbl, tipo]) => {
  const lista = alertas.filter(a => a.tipo === tipo);
  if (!lista.length) return;
  html += `<div class="section-lbl">${lbl}</div>`;
  lista.forEach((a,i) => {
    html += `<div class="venc-item ${a.tipo}">
      <div class="venc-circle" style="background-color:${a.bg}">${a.icon}</div>
      <div style="flex:1"><div class="venc-name">${a.name}</div><div class="venc-detail">${a.detail}</div></div>
      <span class="badge ${a.badge}">${a.badgeTxt}</span>
      <button class="btn ${a.btnCls} btn-sm" onclick="accion('${a.name}','${a.btnTxt}')">${a.btnTxt}</button>
    </div>`;
  });
});
document.getElementById('alertas').innerHTML = html;

function accion(nombre, accion) { mostrarToast(accion + ': ' + nombre, accion==='Retirar'?'error':'info'); }