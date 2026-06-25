/* RF05 - Lista de Deseados */
const descuentos = { 5: '20% OFF' };
let miLista = [];

function cargarLista() {
  const saved = sessionStorage.getItem('deseados');
  if (saved) {
    const ids = JSON.parse(saved);
    miLista = CATALOGO.filter(m => ids.includes(m.id));
  }
  render();
}

function render() {
  document.getElementById('contador').textContent = miLista.length;
  if (miLista.length === 0) {
    document.getElementById('wishList').innerHTML =
      '<div class="empty-wish">Tu lista está vacía.<br><a href="../RF02_inventario/inventario.html">Explorar catálogo</a></div>';
    return;
  }
  document.getElementById('wishList').innerHTML = miLista.map((m, i) => {
    const disc = descuentos[m.id] ? `<span class="wish-disc">${descuentos[m.id]}</span>` : '';
    return `<div class="wish-item">
      <div class="wish-img">${PILL_SVG}</div>
      <div style="flex:1">
        <div class="wish-name">${m.name}</div>
        <div class="wish-cat">${m.cat}</div>
        <div class="wish-price">${formatPrecio(m.price)}${disc}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn btn-primary btn-sm" onclick="comprar(${i})">Comprar</button>
        <button class="btn btn-sm" style="background:#fadbd8;color:#e74c3c;border:none" onclick="eliminar(${i})">Eliminar</button>
      </div>
    </div>`;
  }).join('');
}

function eliminar(i) {
  miLista.splice(i, 1);
  const ids = miLista.map(m => m.id);
  sessionStorage.setItem('deseados', JSON.stringify(ids));
  render();
  mostrarToast('Eliminado de la lista', 'info');
}

function comprar(i) { mostrarToast('Agregado al carrito: ' + miLista[i].name); }
function vaciarLista() {
  if (confirm('¿Vaciar toda la lista?')) {
    miLista = [];
    sessionStorage.removeItem('deseados');
    render();
  }
}

cargarLista();