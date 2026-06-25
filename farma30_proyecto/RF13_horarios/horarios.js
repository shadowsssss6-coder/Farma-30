/* RF13 - Horarios */
const semana = [
  { d:'Lun', open:'7:00 AM', close:'9:00 PM', cerrado:false },
  { d:'Mar', open:'7:00 AM', close:'9:00 PM', cerrado:false },
  { d:'Mié', open:'7:00 AM', close:'9:00 PM', cerrado:false },
  { d:'Jue', open:'7:00 AM', close:'9:00 PM', cerrado:false },
  { d:'Vie', open:'7:00 AM', close:'9:00 PM', cerrado:false },
  { d:'Sáb', open:'8:00 AM', close:'6:00 PM', cerrado:false },
  { d:'Dom', open:'Cerrado', close:'',         cerrado:true  },
];

const diaHoy = new Date().getDay(); // 0=Dom,1=Lun...
const mapa   = [6,0,1,2,3,4,5];    // ajuste: getDay() 0=Dom → índice 6

document.getElementById('schedGrid').innerHTML = semana.map((s,i) => {
  const esHoy = mapa[diaHoy] === i;
  return `<div class="day-card ${esHoy?'today':''} ${s.cerrado?'closed':''}">
    <div class="day-name">${s.d}</div>
    <div class="day-open">${s.cerrado ? 'Cerrado' : s.open}</div>
    ${!s.cerrado ? `<div class="day-close">hasta ${s.close}</div>` : ''}
    ${esHoy ? '<div class="today-badge">HOY</div>' : ''}
  </div>`;
}).join('');

const contactos = [
  ['Teléfono principal','+57 (1) 234-5678'],
  ['Urgencias','+57 310 000 0000'],
  ['Correo','farma30@drogueria.com'],
  ['Dirección','Calle 45 # 23-10, Bogotá'],
];
document.getElementById('contactos').innerHTML = contactos.map(([l,v]) =>
  `<div class="contact-row"><span class="contact-label">${l}</span><span style="font-weight:bold;color:#333">${v}</span></div>`
).join('');