/* RF04 - Gestión de Inventario */
function badgeEstado(e) {
  if (e==='ok')      return '<span class="badge badge-green">● OK</span>';
  if (e==='bajo')    return '<span class="badge badge-orange">⚠ Bajo</span>';
  return '<span class="badge badge-red">✗ Agotado</span>';
}

function renderTabla() {
  document.getElementById('invTable').innerHTML = CATALOGO.map((m,i) => `
    <tr>
      <td class="med-name-cell">${m.name}</td>
      <td>${m.cat}</td>
      <td><span class="editable" contenteditable="true" data-id="${m.id}" data-field="stock">${m.stock}</span></td>
      <td>$<span class="editable" contenteditable="true" data-id="${m.id}" data-field="price">${m.price}</span></td>
      <td>${m.venc}</td>
      <td>${badgeEstado(m.estado)}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="editarFila(${i})">Editar</button>
        <button class="btn btn-sm" style="background:#fadbd8;color:#e74c3c;border:none;margin-left:4px" onclick="eliminarFila(${i})">Eliminar</button>
      </td>
    </tr>`).join('');
}

function guardarCambios() { mostrarToast('✓ Cambios guardados correctamente'); }
function agregarProducto() { alert('Formulario: Agregar nuevo producto'); }
function exportar() { mostrarToast('Exportando lista de inventario...', 'info'); }
function editarFila(i) { mostrarToast('Editando: ' + CATALOGO[i].name, 'info'); }
function eliminarFila(i) {
  if (confirm('¿Eliminar ' + CATALOGO[i].name + '?')) {
    CATALOGO.splice(i, 1);
    renderTabla();
    mostrarToast('Producto eliminado', 'error');
  }
}

renderTabla();