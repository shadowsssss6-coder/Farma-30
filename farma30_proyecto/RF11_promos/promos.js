/* RF11 - Promos Clientes */
const promos = [
  { pct:'20%', med:'Vitamina C 500mg',   desc:'Caja x30 tabletas', exp:'10 Mar 2026', urgente:false },
  { pct:'10%', med:'Loratadina 10mg',    desc:'Tabletas x10',      exp:'14 Mar 2026', urgente:false },
  { pct:'15%', med:'Ibuprofeno 400mg',   desc:'Caja x10 tabletas', exp:'15 Mar 2026', urgente:false },
  { pct:'25%', med:'Amoxicilina 500mg',  desc:'Cápsulas x12',      exp:'13 Mar 2026', urgente:true  },
  { pct:'5%',  med:'Metformina 850mg',   desc:'Tabletas x30',      exp:'20 Mar 2026', urgente:false },
  { pct:'12%', med:'Omeprazol 20mg',     desc:'Cápsulas x14',      exp:'18 Mar 2026', urgente:false },
];
document.getElementById('promoGrid').innerHTML = promos.map(p => `
  <div class="promo-card">
    ${p.urgente ? '<span class="badge badge-red" style="margin-bottom:6px;display:inline-block">Último día</span>' : ''}
    <div class="promo-pct">${p.pct}</div>
    <div class="promo-off">DESCUENTO</div>
    <div class="promo-med">${p.med}</div>
    <div class="promo-desc">${p.desc}</div>
    <div class="promo-exp ${p.urgente?'urgente':''}">Válido hasta: ${p.exp}</div>
    <button class="btn btn-primary btn-sm" style="width:100%;justify-content:center" onclick="mostrarToast('Ver oferta: ${p.med}','info')">Ver oferta</button>
  </div>`).join('');