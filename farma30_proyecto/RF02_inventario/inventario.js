/*  RF02 - Consulta de Inventario */

// Lista de medicamentos marcados como deseados
let deseados = [];

/**
 * Renderiza las tarjetas de medicamentos en el grid
 * @param {Array} lista - Array de medicamentos a mostrar
 */
function renderMeds(lista) {
  const grid = document.getElementById('medGrid');

  if (lista.length === 0) {
    grid.innerHTML = '<div class="no-results">No se encontraron medicamentos</div>';
    return;
  }

  grid.innerHTML = lista.map(m => {
    const esDeseado = deseados.includes(m.id);
    const stockTxt  = m.stock > 0 ? `✓ ${m.stock} uds` : '✗ Agotado';
    const stockCls  = m.stock > 0 ? '' : 'agotado';
    const badgeCls  = m.estado === 'ok' ? 'badge-green' : m.estado === 'bajo' ? 'badge-orange' : 'badge-red';
    const badgeTxt  = m.estado === 'ok' ? 'OK' : m.estado === 'bajo' ? 'Bajo' : 'Agot.';

    return `
      <div class="med-card">
        <button class="wish-btn" onclick="toggleWish(event, ${m.id})">
          ${esDeseado ? '❤️' : '🤍'}
        </button>
        <div class="med-img">${PILL_SVG}</div>
        <div class="med-name">${m.name}</div>
        <div class="med-cat">${m.cat}</div>
        <div class="med-footer">
          <div>
            <div class="med-price">${formatPrecio(m.price)}</div>
            <div class="med-stock ${stockCls}">${stockTxt}</div>
          </div>
          <span class="badge ${badgeCls}">${badgeTxt}</span>
        </div>
      </div>`;
  }).join('');
}

/**
 * Filtra medicamentos por nombre o categoría
 * @param {string} query
 */
function filtrar(query) {
  const q = query.toLowerCase();
  const resultado = CATALOGO.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.cat.toLowerCase().includes(q)
  );
  renderMeds(resultado);
}

/**
 * Limpia la búsqueda y muestra todos los medicamentos
 */
function limpiarBusqueda() {
  document.getElementById('busqueda').value = '';
  renderMeds(CATALOGO);
}

/**
 * Agrega o quita un medicamento de la lista de deseados
 * @param {Event} e - Evento del click (para evitar propagación)
 * @param {number} id - ID del medicamento
 */
function toggleWish(e, id) {
  e.stopPropagation(); // Evita que se active el click de la card
  const idx = deseados.indexOf(id);

  if (idx === -1) {
    deseados.push(id);
    mostrarToast('Agregado a la lista de deseados ❤️');
  } else {
    deseados.splice(idx, 1);
    mostrarToast('Eliminado de la lista de deseados', 'info');
  }

  // Guarda en sessionStorage para RF05
  sessionStorage.setItem('deseados', JSON.stringify(deseados));
  renderMeds(CATALOGO);
}

// Carga inicial: recupera deseados guardados y renderiza
const savedWish = sessionStorage.getItem('deseados');
if (savedWish) deseados = JSON.parse(savedWish);
renderMeds(CATALOGO);
