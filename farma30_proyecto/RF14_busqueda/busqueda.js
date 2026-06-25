/* RF14 - Búsqueda Avanzada */
const cats = ['Todos','Analgésico','Antibiótico','Alérgico','Gastro','Vitamina','Cardiovascular','Diabetes'];
let activeCat = null;

document.getElementById('chips').innerHTML = cats.map((c,i) =>
  `<div class="chip ${i===0?'active':''}" onclick="setChip(this,'${c}')">${c}</div>`
).join('');

function setChip(el, cat) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  activeCat = cat === 'Todos' ? null : cat;
  doSearch(document.getElementById('heroSearch').value);
}

function doSearch(q) {
  const res = CATALOGO.filter(m =>
    (!q || m.name.toLowerCase().includes(q.toLowerCase()) || m.cat.toLowerCase().includes(q.toLowerCase())) &&
    (!activeCat || m.cat === activeCat)
  );

  if (res.length === 0) {
    document.getElementById('results').innerHTML = '<div class="no-results">No se encontraron resultados</div>';
    return;
  }

  document.getElementById('results').innerHTML = res.map(m => {
    const hl = resaltarTexto(m.name, q);
    return `<div class="result-item">
      <div class="result-img">${PILL_SVG}</div>
      <div style="flex:1">
        <div class="result-name">${hl}</div>
        <div class="result-detail">${m.cat} &nbsp;·&nbsp; Stock: ${m.stock} uds</div>
      </div>
      <div class="result-price">${formatPrecio(m.price)}</div>
      <button class="btn btn-primary btn-sm" onclick="mostrarToast('Ver: ${m.name}','info')">Ver</button>
    </div>`;
  }).join('');
}

doSearch('');