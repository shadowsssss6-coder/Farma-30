/* RF15 - Escáner de Código de Barras */
function simularEscaneo() {
  const med  = CATALOGO[Math.floor(Math.random() * CATALOGO.length)];
  const code = '7702' + Math.floor(Math.random() * 1000000).toString().padStart(6,'0');
  const inv  = 'INVIMA 2021M-0' + Math.floor(Math.random() * 9999);
  const enStock = med.stock > 0;

  document.getElementById('scanResult').innerHTML = `
    <div class="scan-result">
      <div class="result-header">
        <div class="result-img-box">💊</div>
        <div>
          <div class="result-title">${med.name}</div>
          <div class="result-code">Código: ${code}</div>
          <span class="badge ${enStock ? 'badge-green':'badge-red'}" style="margin-top:5px;display:inline-block">
            ${enStock ? 'En stock' : 'Agotado'}
          </span>
        </div>
      </div>
      <div class="spec-row"><span class="spec-key">Categoría</span><span class="spec-val">${med.cat}</span></div>
      <div class="spec-row"><span class="spec-key">Precio</span><span class="spec-val">${formatPrecio(med.price)}</span></div>
      <div class="spec-row"><span class="spec-key">Stock disponible</span><span class="spec-val">${med.stock} unidades</span></div>
      <div class="spec-row"><span class="spec-key">Vencimiento</span><span class="spec-val">${med.venc}</span></div>
      <div class="spec-row"><span class="spec-key">Laboratorio</span><span class="spec-val">${med.lab}</span></div>
      <div class="spec-row"><span class="spec-key">Registro INVIMA</span><span class="spec-val">${inv}</span></div>
      <div class="action-row">
        <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="mostrarToast('Comprando: ${med.name}')">Comprar</button>
        <button class="btn btn-outline" style="flex:1;justify-content:center" onclick="mostrarToast('Agregado al carrito: ${med.name}','info')">Al carrito</button>
      </div>
    </div>`;

  mostrarToast('Producto escaneado: ' + med.name, 'info');
}