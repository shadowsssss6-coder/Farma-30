/* RF08 - Detalle de Ventas */
const periodos = ['Hoy','Esta semana','Este mes','Rango personalizado'];
let periodoActivo = 'Hoy';

const ventas = [
  { hora:'09:14 AM', med:'Amoxicilina 500mg x2',              empleado:'Carlos R.', pago:'Efectivo',      pagoCls:'badge-green',  val:'$37.000'  },
  { hora:'10:32 AM', med:'Ibuprofeno 400mg + Loratadina 10mg', empleado:'María S.',  pago:'Tarjeta',        pagoCls:'badge-blue',   val:'$20.500'  },
  { hora:'11:58 AM', med:'Vitamina C 500mg x3',               empleado:'Carlos R.', pago:'Transferencia',  pagoCls:'badge-purple', val:'$28.500'  },
  { hora:'02:15 PM', med:'Omeprazol 20mg x1 + Metformina x2', empleado:'Ana L.',    pago:'Efectivo',       pagoCls:'badge-green',  val:'$59.000'  },
  { hora:'03:47 PM', med:'Amoxicilina x1 + Ibuprofeno x3',    empleado:'Carlos R.', pago:'Tarjeta',        pagoCls:'badge-blue',   val:'$54.500'  },
];

document.getElementById('periodoTabs').innerHTML =
  periodos.map(p => `<button class="ptab ${p===periodoActivo?'active':''}" onclick="setPeriodo(this,'${p}')">${p}</button>`).join('') +
  '<button class="btn btn-outline btn-sm" style="margin-left:auto" onclick="mostrarToast('Exportando PDF...','info')">Exportar PDF</button>';

function setPeriodo(el, p) {
  periodoActivo = p;
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const fecha = new Date();
  document.getElementById('resumenTitulo').textContent =
    'Total – ' + p + ' (' + fecha.toLocaleDateString('es-CO') + ')';
}

document.getElementById('resumenTitulo').textContent =
  'Total del día – ' + new Date().toLocaleDateString('es-CO',{weekday:'long',day:'numeric',month:'short',year:'numeric'});

document.getElementById('timeline').innerHTML = ventas.map(v => `
  <div class="tl-item">
    <div class="tl-dot"></div>
    <div class="tl-time">${v.hora}</div>
    <div class="tl-med">${v.med}</div>
    <div class="tl-detail">${v.empleado} &nbsp;·&nbsp; <span class="badge ${v.pagoCls}">${v.pago}</span></div>
    <div class="tl-val">${v.val}</div>
  </div>`).join('');