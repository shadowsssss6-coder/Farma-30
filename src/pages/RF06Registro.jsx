import { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import { CATALOGO, formatPrecio } from '../utils/globalUtils.js';
import '../styles/registro.css';

const METODOS_PAGO = [
  { id: 'efectivo', icon: '💵', label: 'Efectivo' },
  { id: 'tarjeta', icon: '💳', label: 'Tarjeta' },
  { id: 'transferencia', icon: '📱', label: 'Transferencia' },
];

/**
 * RF06 - Registro de Ventas.
 * Permite construir una venta agregando medicamentos del catálogo,
 * ajustando cantidades, seleccionando el método de pago y registrando
 * la transacción. Historia de usuario: "Como empleado, quiero
 * registrar una venta seleccionando productos y forma de pago."
 */
export default function RF06Registro() {
  const [items, setItems] = useState([]);
  const [medSeleccionado, setMedSeleccionado] = useState('');
  const [pagoSeleccionado, setPagoSeleccionado] = useState('efectivo');
  const { mostrarToast } = useToast();

  const total = items.reduce((s, it) => s + it.price * it.qty, 0);

  function agregar() {
    const id = parseInt(medSeleccionado);
    if (!id) return;

    const med = CATALOGO.find((m) => m.id === id);
    const existente = items.find((i) => i.id === id);

    if (existente) {
      setItems(items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      setItems([...items, { id: med.id, name: med.name, price: med.price, qty: 1 }]);
    }
    setMedSeleccionado('');
  }

  function eliminarItem(i) {
    setItems(items.filter((_, idx) => idx !== i));
  }

  function cambiarQty(i, valor) {
    const nuevaCantidad = Math.max(1, parseInt(valor) || 1);
    setItems(items.map((it, idx) => (idx === i ? { ...it, qty: nuevaCantidad } : it)));
  }

  function cancelar() {
    if (confirm('¿Cancelar la venta?')) {
      setItems([]);
    }
  }

  function registrar() {
    if (items.length === 0) {
      mostrarToast('Agrega al menos un producto', 'error');
      return;
    }
    mostrarToast('✓ Venta registrada exitosamente');
    setItems([]);
  }

  return (
    <>
      <TopBar rf="RF06" titulo="Registro de Ventas" prev="/rf05-deseados" next="/rf07-vencimientos" />

      <main className="page" style={{ maxWidth: '820px' }}>
        <div className="page-title">RF06 · Registro de Ventas</div>
        <div className="page-sub">Registra una nueva venta seleccionando productos y método de pago</div>

        <div className="card">
          <div className="card-title">Agregar medicamentos</div>
          <div className="search-row">
            <select
              className="med-select"
              value={medSeleccionado}
              onChange={(e) => setMedSeleccionado(e.target.value)}
            >
              <option value="">Seleccionar medicamento...</option>
              {CATALOGO.map((m) => (
                <option value={m.id} key={m.id}>
                  {m.name} – {formatPrecio(m.price)}
                </option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={agregar}>
              + Agregar
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Precio unit.</th>
                <th>Cant.</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#aaa', padding: '20px' }}>
                    Sin productos agregados
                  </td>
                </tr>
              ) : (
                items.map((it, i) => (
                  <tr key={it.id}>
                    <td style={{ fontWeight: 'bold', color: '#2980b9' }}>{it.name}</td>
                    <td>{formatPrecio(it.price)}</td>
                    <td>
                      <input
                        className="qty-input"
                        type="number"
                        min="1"
                        value={it.qty}
                        onChange={(e) => cambiarQty(i, e.target.value)}
                      />
                    </td>
                    <td style={{ fontWeight: 'bold' }}>{formatPrecio(it.price * it.qty)}</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{ background: '#fadbd8', color: '#e74c3c', border: 'none' }}
                        onClick={() => eliminarItem(i)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="total-row">
            <span className="total-label">TOTAL:</span>
            <span className="total-val">{formatPrecio(total)}</span>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Método de pago</div>
          <div className="pay-toggle">
            {METODOS_PAGO.map((m) => (
              <div
                key={m.id}
                className={`pay-opt ${pagoSeleccionado === m.id ? 'selected' : ''}`}
                onClick={() => setPagoSeleccionado(m.id)}
              >
                <div className="pay-icon">{m.icon}</div>
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          <div className="action-row">
            <button className="btn btn-outline" onClick={cancelar}>
              Cancelar
            </button>
            <button className="btn btn-success" onClick={registrar}>
              Registrar Venta
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
