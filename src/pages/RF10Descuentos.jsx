import { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import { CATALOGO } from '../utils/globalUtils.js';
import '../styles/descuentos.css';

const ACTIVOS_INICIALES = [
  { med: 'Vitamina C 500mg', pct: '20%', fecha: '10 Mar 2026' },
  { med: 'Loratadina 10mg', pct: '10%', fecha: '14 Mar 2026' },
  { med: 'Ibuprofeno 400mg', pct: '15%', fecha: '15 Mar 2026' },
];

/** Fecha por defecto: 30 días desde hoy, en formato yyyy-mm-dd para el input date. */
function fechaPorDefecto() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

/** Formatea una fecha (yyyy-mm-dd) al formato legible en español. */
function formatearFecha(fechaTexto) {
  if (!fechaTexto) return '--';
  const d = new Date(fechaTexto + 'T00:00:00');
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * RF10 - Gestión de Descuentos.
 * Permite configurar un nuevo descuento (medicamento, porcentaje,
 * fecha de vigencia) con vista previa en vivo, y administrar la lista
 * de descuentos activos.
 */
export default function RF10Descuentos() {
  const [medSeleccionado, setMedSeleccionado] = useState('');
  const [porcentaje, setPorcentaje] = useState(20);
  const [fechaFin, setFechaFin] = useState(fechaPorDefecto());
  const [activos, setActivos] = useState(ACTIVOS_INICIALES);
  const { mostrarToast } = useToast();

  function aplicar() {
    if (!medSeleccionado) {
      mostrarToast('Selecciona un medicamento', 'error');
      return;
    }
    setActivos([{ med: medSeleccionado, pct: porcentaje + '%', fecha: formatearFecha(fechaFin) }, ...activos]);
    mostrarToast('✓ Descuento aplicado a ' + medSeleccionado);
  }

  function eliminarActivo(i) {
    setActivos(activos.filter((_, idx) => idx !== i));
    mostrarToast('Descuento eliminado', 'info');
  }

  return (
    <>
      <TopBar rf="RF10" titulo="Gestión de Descuentos" prev="/rf09-notificaciones" next="/rf11-promos" />

      <main className="page" style={{ maxWidth: '940px' }}>
        <div className="page-title">RF10 · Gestión de Descuentos</div>
        <div className="page-sub">Configura descuentos y promociones sobre los medicamentos del catálogo</div>

        <div className="grid2">
          <div className="card">
            <div className="card-title">Configurar nuevo descuento</div>

            <div className="field">
              <label htmlFor="medSel">Medicamento</label>
              <select id="medSel" value={medSeleccionado} onChange={(e) => setMedSeleccionado(e.target.value)}>
                <option value="">Seleccionar...</option>
                {CATALOGO.map((m) => (
                  <option value={m.name} key={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>
                Porcentaje: <span style={{ color: '#3498db', fontWeight: 'bold' }}>{porcentaje}%</span>
              </label>
              <div className="slider-row">
                <input
                  type="range"
                  min="1"
                  max="80"
                  value={porcentaje}
                  onChange={(e) => setPorcentaje(Number(e.target.value))}
                />
                <span className="slider-val">{porcentaje}%</span>
              </div>
            </div>

            <div className="field">
              <label htmlFor="fechaFin">Válido hasta</label>
              <input
                type="date"
                id="fechaFin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button className="btn btn-outline" onClick={() => mostrarToast('Descuento cancelado', 'info')}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={aplicar}>
                Aplicar descuento
              </button>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#555', marginBottom: '10px' }}>
              Vista previa
            </div>
            <div className="disc-preview">
              <div className="disc-pct">{porcentaje}% OFF</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>DESCUENTO</div>
              <div className="disc-med">{medSeleccionado || 'Selecciona un medicamento'}</div>
              <div style={{ fontSize: '12px', opacity: 0.75, marginTop: '3px' }}>Presentación del producto</div>
              <div className="disc-tag">Válido hasta: {formatearFecha(fechaFin)}</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '20px' }}>
          <div className="card-title">Descuentos activos</div>
          <table>
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Descuento</th>
                <th>Vigencia</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {activos.map((a, i) => (
                <tr key={i}>
                  <td>{a.med}</td>
                  <td style={{ fontWeight: 'bold', color: '#3498db' }}>{a.pct}</td>
                  <td>{a.fecha}</td>
                  <td>
                    <span className="badge badge-green">Activo</span>
                  </td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => eliminarActivo(i)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
