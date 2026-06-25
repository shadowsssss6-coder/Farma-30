/* RF10 - Descuentos */
let activos = [
  { med:'Vitamina C 500mg', pct:'20%', fecha:'10 Mar 2026' },
  { med:'Loratadina 10mg',  pct:'10%', fecha:'14 Mar 2026' },
  { med:'Ibuprofeno 400mg', pct:'15%', fecha:'15 Mar 2026' },
];

// Poblamos el select con el catálogo
document.getElementById('medSel').innerHTML +=
  CATALOGO.map(m => `<option value="${m.name}">${m.name}</option>`).join('');

// Fecha por defecto: 30 días desde hoy
const def = new Date(); def.setDate(def.getDate()+30);
document.getElementById('fechaFin').value = def.toISOString().split('T')[0];
updatePreview();

function updatePreview() {
  const pct  = document.getElementById('pctSlider').value;
  const med  = document.getElementById('medSel').value || 'Selecciona un medicamento';
  const fecha= document.getElementById('fechaFin').value;
  document.getElementById('prevPct').textContent   = pct + '% OFF';
  document.getElementById('sliderVal').textContent = pct + '%';
  document.getElementById('pctLabel').textContent  = pct + '%';
  document.getElementById('prevMed').textContent   = med;
  if (fecha) {
    const d = new Date(fecha + 'T00:00:00');
    document.getElementById('prevDate').textContent = 'Válido hasta: ' + d.toLocaleDateString('es-CO',{day:'numeric',month:'short',year:'numeric'});
  }
}

function aplicar() {
  const med = document.getElementById('medSel').value;
  if (!med) { mostrarToast('Selecciona un medicamento','error'); return; }
  const pct  = document.getElementById('pctSlider').value + '%';
  const fecha= document.getElementById('fechaFin').value;
  const d    = new Date(fecha + 'T00:00:00');
  activos.unshift({ med, pct, fecha: d.toLocaleDateString('es-CO',{day:'numeric',month:'short',year:'numeric'}) });
  renderActivos();
  mostrarToast('✓ Descuento aplicado a ' + med);
}

function renderActivos() {
  document.getElementById('activosTable').innerHTML = activos.map((a,i) => `
    <tr>
      <td>${a.med}</td>
      <td style="font-weight:bold;color:#3498db">${a.pct}</td>
      <td>${a.fecha}</td>
      <td><span class="badge badge-green">Activo</span></td>
      <td><button class="btn btn-outline btn-sm" onclick="eliminarActivo(${i})">Eliminar</button></td>
    </tr>`).join('');
}

function eliminarActivo(i) { activos.splice(i,1); renderActivos(); mostrarToast('Descuento eliminado','info'); }
renderActivos();