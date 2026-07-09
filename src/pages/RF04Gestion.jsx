import { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import { CATALOGO as CATALOGO_INICIAL } from '../utils/globalUtils.js';
import '../styles/gestion.css';

/** Retorna la etiqueta visual (badge) correspondiente al estado del producto. */
function Badge({ estado }) {
  if (estado === 'ok') return <span className="badge badge-green">● OK</span>;
  if (estado === 'bajo') return <span className="badge badge-orange">⚠ Bajo</span>;
  return <span className="badge badge-red">✗ Agotado</span>;
}

/**
 * RF04 - Gestión de Inventario.
 * Permite editar el stock/precio de cada medicamento directamente en
 * la tabla, agregar, editar y eliminar productos del catálogo.
 * Historia de usuario: "Como empleado, quiero gestionar el inventario
 * de la droguería para mantener actualizado el stock y los precios."
 */
export default function RF04Gestion() {
  const [catalogo, setCatalogo] = useState(CATALOGO_INICIAL);
  const { mostrarToast } = useToast();

  function guardarCambios() {
    mostrarToast('✓ Cambios guardados correctamente');
  }

  function agregarProducto() {
    alert('Formulario: Agregar nuevo producto');
  }

  function exportar() {
    mostrarToast('Exportando lista de inventario...', 'info');
  }

  function editarFila(i) {
    mostrarToast('Editando: ' + catalogo[i].name, 'info');
  }

  function eliminarFila(i) {
    if (confirm('¿Eliminar ' + catalogo[i].name + '?')) {
      setCatalogo(catalogo.filter((_, idx) => idx !== i));
      mostrarToast('Producto eliminado', 'error');
    }
  }

  /** Actualiza en memoria el valor editado directamente en la celda (stock/precio). */
  function actualizarCampo(id, campo, valor) {
    setCatalogo(catalogo.map((m) => (m.id === id ? { ...m, [campo]: Number(valor) || 0 } : m)));
  }

  return (
    <>
      <TopBar rf="RF04" titulo="Gestión de Inventario" prev="/rf03-ventas" next="/rf05-deseados" />

      <main className="page">
        <div className="page-title">RF04 · Gestión de Inventario</div>
        <div className="page-sub">Edita el stock y precio de cada medicamento directamente en la tabla</div>

        <div className="toolbar">
          <button className="btn btn-primary" onClick={agregarProducto}>
            + Agregar producto
          </button>
          <button className="btn btn-outline" onClick={exportar}>
            Exportar
          </button>
          <button className="btn btn-success" onClick={guardarCambios}>
            Guardar cambios
          </button>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table>
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Vencimiento</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {catalogo.map((m, i) => (
                <tr key={m.id}>
                  <td className="med-name-cell">{m.name}</td>
                  <td>{m.cat}</td>
                  <td>
                    <span
                      className="editable"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => actualizarCampo(m.id, 'stock', e.target.textContent)}
                    >
                      {m.stock}
                    </span>
                  </td>
                  <td>
                    $
                    <span
                      className="editable"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => actualizarCampo(m.id, 'price', e.target.textContent)}
                    >
                      {m.price}
                    </span>
                  </td>
                  <td>{m.venc}</td>
                  <td>
                    <Badge estado={m.estado} />
                  </td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => editarFila(i)}>
                      Editar
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ background: '#fadbd8', color: '#e74c3c', border: 'none', marginLeft: '4px' }}
                      onClick={() => eliminarFila(i)}
                    >
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
