/* RF03 - Resumen de Ventas */
const dias = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
const datosVentas = [3200000,4100000,2800000,4280000,3600000,2200000,1500000];

const kpis = [
  { color:'#3498db', icon:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', val:'$4.280.000', label:'Ventas del día',        trend:'up',   txt:'▲ +12% vs ayer' },
  { color:'#27ae60', icon:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>', val:'47', label:'Transacciones', trend:'up',   txt:'▲ +5% vs ayer' },
  { color:'#e67e22', icon:'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>', val:'312', label:'Unidades vendidas', trend:'down', txt:'▼ -3% vs ayer' },
  { color:'#e74c3c', icon:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>', val:'3', label:'Productos vencidos', trend:'down', txt:'▼ Atención' },
];

const topMeds = [
  ['Amoxicilina 500mg','48','$888.000'],['Ibuprofeno 400mg','35','$420.000'],
  ['Loratadina 10mg','28','$238.000'],['Vitamina C 500mg','22','$209.000'],['Omeprazol 20mg','18','$270.000'],
];

// Fecha
const hoy = new Date();
document.getElementById('fechaHoy').textContent =
  'Métricas del día – ' + hoy.toLocaleDateString('es-CO',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

// KPIs
document.getElementById('kpiGrid').innerHTML = kpis.map(k => `
  <div class="kpi">
    <div class="kpi-icon" style="background-color:${k.color}">
      <svg viewBox="0 0 24 24">${k.icon}</svg>
    </div>
    <div class="kpi-val">${k.val}</div>
    <div class="kpi-label">${k.label}</div>
    <div class="kpi-trend ${k.trend}">${k.txt}</div>
  </div>`).join('');

// Gráfico de barras
const maxV = Math.max(...datosVentas);
document.getElementById('barChart').innerHTML = datosVentas.map((v,i) => `
  <div class="bar-col">
    <div class="bar-fill" style="height:${(v/maxV)*90}px;background-color:${i===3?'#3498db':'#aed6f1'}"></div>
    <div class="bar-day">${dias[i]}</div>
  </div>`).join('');

// Tabla top productos
document.getElementById('topTable').innerHTML = topMeds.map(r => `
  <tr><td>${r[0]}</td><td>${r[1]}</td><td style="font-weight:bold;color:#3498db">${r[2]}</td></tr>`).join('');