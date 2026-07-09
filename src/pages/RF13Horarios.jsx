import TopBar from '../components/TopBar.jsx';
import '../styles/horarios.css';

const SEMANA = [
  { d: 'Lun', open: '7:00 AM', close: '9:00 PM', cerrado: false },
  { d: 'Mar', open: '7:00 AM', close: '9:00 PM', cerrado: false },
  { d: 'Mié', open: '7:00 AM', close: '9:00 PM', cerrado: false },
  { d: 'Jue', open: '7:00 AM', close: '9:00 PM', cerrado: false },
  { d: 'Vie', open: '7:00 AM', close: '9:00 PM', cerrado: false },
  { d: 'Sáb', open: '8:00 AM', close: '6:00 PM', cerrado: false },
  { d: 'Dom', open: 'Cerrado', close: '', cerrado: true },
];

// getDay() de JS retorna 0=Domingo,1=Lunes... Este mapa reordena el índice
// para que coincida con el arreglo SEMANA, que empieza en Lunes.
const MAPA_DIA = [6, 0, 1, 2, 3, 4, 5];

const CONTACTOS = [
  ['Teléfono principal', '+57 (1) 234-5678'],
  ['Urgencias', '+57 310 000 0000'],
  ['Correo', 'farma30@drogueria.com'],
  ['Dirección', 'Calle 45 # 23-10, Bogotá'],
];

/**
 * RF13 - Horarios de Atención.
 * Calendario semanal de atención de la droguería, resaltando el día
 * actual, e información de contacto.
 */
export default function RF13Horarios() {
  const diaHoy = new Date().getDay();
  const indiceHoy = MAPA_DIA[diaHoy];

  return (
    <>
      <TopBar rf="RF13" titulo="Horarios de Atención" prev="/rf12-emp-descuentos" next="/rf14-busqueda" />

      <main className="page" style={{ maxWidth: '900px' }}>
        <div className="page-title">RF13 · Horarios de Atención</div>
        <div className="page-sub">Calendario semanal de atención de la Droguería Farma 30</div>

        <div className="sched-grid">
          {SEMANA.map((s, i) => {
            const esHoy = indiceHoy === i;
            return (
              <div className={`day-card ${esHoy ? 'today' : ''} ${s.cerrado ? 'closed' : ''}`} key={s.d}>
                <div className="day-name">{s.d}</div>
                <div className="day-open">{s.cerrado ? 'Cerrado' : s.open}</div>
                {!s.cerrado && <div className="day-close">hasta {s.close}</div>}
                {esHoy && <div className="today-badge">HOY</div>}
              </div>
            );
          })}
        </div>

        <div className="alert alert-info" style={{ marginBottom: '16px' }}>
          <div className="alert-body">
            <h4>Turno de urgencias</h4>
            <p>Los sábados y festivos se habilita turno especial de 10:00 PM a 6:00 AM con servicio reducido.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Información de contacto</div>
          <div>
            {CONTACTOS.map(([label, valor]) => (
              <div className="contact-row" key={label}>
                <span className="contact-label">{label}</span>
                <span style={{ fontWeight: 'bold', color: '#333' }}>{valor}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
