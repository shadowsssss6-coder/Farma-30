/*  FARMA 30 - Utilidades JavaScript Globales */

/**
 * Muestra un toast de confirmación temporal
 * @param {string} mensaje - Texto a mostrar
 * @param {string} tipo - 'success' | 'error' | 'info'
 */
function mostrarToast(mensaje, tipo = 'success') {
  let toast = document.getElementById('toast');

  // Si no existe el toast en el HTML, lo crea dinámicamente
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  // Colores según tipo
  const colores = {
    success: '#27ae60',
    error:   '#e74c3c',
    info:    '#3498db'
  };

  toast.textContent = mensaje;
  toast.style.backgroundColor = colores[tipo] || colores.success;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 2800);
}

/**
 * Formatea un número como precio colombiano
 * @param {number} valor
 * @returns {string} Ej: $18.500
 */
function formatPrecio(valor) {
  return '$' + Number(valor).toLocaleString('es-CO');
}

/**
 * Resalta un término de búsqueda dentro de un texto
 * @param {string} texto - Texto original
 * @param {string} query - Término a resaltar
 * @returns {string} HTML con el término resaltado
 */
function resaltarTexto(texto, query) {
  if (!query) return texto;
  return texto.replace(
    new RegExp(query, 'gi'),
    s => `<span class="highlight">${s}</span>`
  );
}

/**
 * SVG de ícono de píldora reutilizable
 */
const PILL_SVG = `<svg viewBox="0 0 24 24" fill="#3498db" opacity="0.6">
  <path d="M10.5 3.5a6 6 0 0 1 8.485 8.485L10.5 20.485 2.015 12A6 6 0 0 1 10.5 3.5z"/>
</svg>`;

/**
 * Catálogo de medicamentos compartido entre módulos
 */
const CATALOGO = [
  { id:1, name:'Amoxicilina 500mg',   cat:'Antibiótico',    price:18500, stock:245, venc:'Dic 2026', lab:'Tecnoquímicas S.A.', estado:'ok'     },
  { id:2, name:'Ibuprofeno 400mg',    cat:'Analgésico',     price:12000, stock:180, venc:'Mar 2027', lab:'Bayer Colombia',     estado:'ok'     },
  { id:3, name:'Loratadina 10mg',     cat:'Alérgico',       price:8500,  stock:320, venc:'Ago 2027', lab:'Genfar S.A.',        estado:'ok'     },
  { id:4, name:'Omeprazol 20mg',      cat:'Gastro',         price:15000, stock:12,  venc:'Mar 2026', lab:'Tecnoquímicas S.A.', estado:'bajo'   },
  { id:5, name:'Vitamina C 500mg',    cat:'Vitamina',       price:9500,  stock:200, venc:'Jun 2027', lab:'Procaps S.A.',       estado:'ok'     },
  { id:6, name:'Metformina 850mg',    cat:'Diabetes',       price:22000, stock:90,  venc:'Nov 2026', lab:'Genfar S.A.',        estado:'ok'     },
  { id:7, name:'Atorvastatina 20mg',  cat:'Cardiovascular', price:35000, stock:55,  venc:'Ene 2027', lab:'Pfizer Colombia',    estado:'ok'     },
  { id:8, name:'Clorfenamina 4mg',    cat:'Alérgico',       price:6000,  stock:0,   venc:'Ene 2026', lab:'Tecnoquímicas S.A.', estado:'agotado'},
];
