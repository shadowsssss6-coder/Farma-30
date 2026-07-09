import { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import { useToast } from '../utils/ToastContext.jsx';
import { CATALOGO, formatPrecio } from '../utils/globalUtils.js';
import '../styles/scanner.css';

/**
 * RF15 - Escáner de Código de Barras.
 * Simula el escaneo de un producto (en un dispositivo real se
 * integraría con la cámara o un lector físico), mostrando su ficha
 * técnica completa.
 */
export default function RF15Scanner() {
  const [resultado, setResultado] = useState(null);
  const { mostrarToast } = useToast();

  function simularEscaneo() {
    const med = CATALOGO[Math.floor(Math.random() * CATALOGO.length)];
    const codigo = '7702' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const invima = 'INVIMA 2021M-0' + Math.floor(Math.random() * 9999);

    setResultado({ med, codigo, invima });
    mostrarToast('Producto escaneado: ' + med.name, 'info');
  }

  const enStock = resultado && resultado.med.stock > 0;

  return (
    <>
      <TopBar rf="RF15" titulo="Código de Barras" prev="/rf14-busqueda" next="/rf01-login" nextLabel="Inicio →" />

      <main className="page" style={{ maxWidth: '600px' }}>
        <div className="page-title">RF15 · Escáner de Código de Barras</div>
        <div className="page-sub">Escanea el código del medicamento para consulta rápida</div>

        <div className="scanner-box">
          <div className="scanner-frame" />
          <div className="scanner-line" />
          <div className="sc sc-tl" />
          <div className="sc sc-tr" />
          <div className="sc sc-bl" />
          <div className="sc sc-br" />
          <p className="scan-label">Apunta al código de barras</p>
        </div>

        <button className="btn btn-primary scan-btn" onClick={simularEscaneo}>
          Simular Escaneo
        </button>

        {!resultado ? (
          <div className="empty-scan">Escanea un producto para ver su información</div>
        ) : (
          <div className="scan-result">
            <div className="result-header">
              <div className="result-img-box">💊</div>
              <div>
                <div className="result-title">{resultado.med.name}</div>
                <div className="result-code">Código: {resultado.codigo}</div>
                <span
                  className={`badge ${enStock ? 'badge-green' : 'badge-red'}`}
                  style={{ marginTop: '5px', display: 'inline-block' }}
                >
                  {enStock ? 'En stock' : 'Agotado'}
                </span>
              </div>
            </div>

            <div className="spec-row">
              <span className="spec-key">Categoría</span>
              <span className="spec-val">{resultado.med.cat}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Precio</span>
              <span className="spec-val">{formatPrecio(resultado.med.price)}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Stock disponible</span>
              <span className="spec-val">{resultado.med.stock} unidades</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Vencimiento</span>
              <span className="spec-val">{resultado.med.venc}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Laboratorio</span>
              <span className="spec-val">{resultado.med.lab}</span>
            </div>
            <div className="spec-row">
              <span className="spec-key">Registro INVIMA</span>
              <span className="spec-val">{resultado.invima}</span>
            </div>

            <div className="action-row">
              <button
                className="btn btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => mostrarToast('Comprando: ' + resultado.med.name)}
              >
                Comprar
              </button>
              <button
                className="btn btn-outline"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => mostrarToast('Agregado al carrito: ' + resultado.med.name, 'info')}
              >
                Al carrito
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
