/* RF06 - Registro de Ventas */
let items = [];

// Puebla el selector con el catálogo
document.getElementById('medSelect').innerHTML +=
  CATALOGO.map(m => `<option value="${m.id}">${m.name} – ${formatPrecio(m.price)}</option>`).join('');

function renderDetalle() {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('totalVal').textContent = formatPrecio(total);
  document.getElementById('detalle').innerHTML = items.length === 0
    ? '<tr><td colspan="5" style="text-align:center;color:#aaa;padding:20px">Sin productos agregados</td></tr>'
    : items.map((it, i) => `
      <tr>
        <td style="font-weight:bold;color:#2980b9">${it.name}</td>
        <td>${formatPrecio(it.price)}</td>
        <td><input class="qty-input" type="number" min="1" value="${it.qty}" onchange="cambiarQty(${i},this.value)"/></td>
        <td style="font-weight:bold">${formatPrecio(it.price * it.qty)}</td>
        <td><button class="btn btn-sm" style="background:#fadbd8;color:#e74c3c;border:none" onclick="eliminarItem(${i})">✕</button></td>
      </tr>`).join('');
}

function agregar() {
  const sel = document.getElementById('medSelect');
  const id  = parseInt(sel.value);
  if (!id) return;
  const med = CATALOGO.find(m => m.id === id);
  const exist = items.find(i => i.id === id);
  if (exist) { exist.qty++; }
  else { items.push({ id: med.id, name: med.name, price: med.price, qty: 1 }); }
  sel.value = '';
  renderDetalle();
}

function eliminarItem(i) { items.splice(i, 1); renderDetalle(); }
function cambiarQty(i, v) { items[i].qty = Math.max(1, parseInt(v) || 1); renderDetalle(); }
function selectPay(el) {
  document.querySelectorAll('.pay-opt').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
}
function cancelar() { if (confirm('¿Cancelar la venta?')) { items = []; renderDetalle(); } }
function registrar() {
  if (items.length === 0) { mostrarToast('Agrega al menos un producto', 'error'); return; }
  mostrarToast('✓ Venta registrada exitosamente');
  items = []; renderDetalle();
}

renderDetalle();