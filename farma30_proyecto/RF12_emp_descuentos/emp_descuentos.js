/* RF12 - Descuentos Empleados */
let ofertas = [
  { pct:'30%', prov:'Almamedica S.A.',        med:'Amoxicilina 500mg x1000', desc:'Descuento por volumen en pedidos mayores a $5M',      exp:'15 Mar 2026' },
  { pct:'18%', prov:'Distribuciones Pharma',  med:'Ibuprofeno 400mg x500',   desc:'Oferta de temporada para antiinflamatorios',           exp:'12 Mar 2026' },
  { pct:'25%', prov:'LaboBogotá Ltda.',        med:'Metformina 850mg x200',   desc:'Descuento especial por cierre de lote próximo a vencer',exp:'20 Mar 2026' },
  { pct:'12%', prov:'Farmacias Central',       med:'Loratadina 10mg x300',    desc:'Renovación de inventario con precio especial',         exp:'18 Mar 2026' },
];

function render() {
  document.getElementById('empList').innerHTML = ofertas.length === 0
    ? '<div style="text-align:center;padding:40px;color:#aaa">No hay ofertas disponibles en este momento</div>'
    : ofertas.map((e,i) => `
      <div class="emp-notif">
        <div class="emp-badge">${e.pct}<br>OFF</div>
        <div style="flex:1">
          <div class="emp-prov">${e.prov}</div>
          <div class="emp-med">${e.med}</div>
          <div class="emp-desc">${e.desc}</div>
          <div class="emp-vence">Vence: ${e.exp}</div>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary btn-sm" onclick="pedir(${i})">Pedir</button>
          <button class="btn btn-outline btn-sm" onclick="ignorar(${i})">Ignorar</button>
        </div>
      </div>`).join('');
}

function pedir(i) { mostrarToast('Iniciando pedido a ' + ofertas[i].prov); }
function ignorar(i) { ofertas.splice(i,1); render(); mostrarToast('Oferta ignorada','info'); }

render();