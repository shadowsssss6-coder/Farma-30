import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import { SesionProvider } from './utils/SesionContext.jsx';
import { ToastProvider } from './utils/ToastContext.jsx';

import './styles/global.css';

/**
 * Punto de entrada de la aplicación. Envuelve el árbol de componentes
 * con los proveedores de contexto (sesión y notificaciones) y el
 * enrutador de React Router.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SesionProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </SesionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
