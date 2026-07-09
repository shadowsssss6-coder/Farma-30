/**
 * Utilidades globales del proyecto Farma 30.
 * Migración de la lógica de shared/global.js del prototipo HTML/CSS/JS
 * original hacia funciones reutilizables por los componentes de React.
 */

/**
 * Formatea un número como precio en pesos colombianos.
 * @param {number} valor - Valor numérico a formatear.
 * @returns {string} Ej: "$18.500"
 */
export function formatPrecio(valor) {
  return '$' + Number(valor).toLocaleString('es-CO');
}

/**
 * Resalta un término de búsqueda dentro de un texto, envolviéndolo
 * en un <span class="highlight">. Retorna un arreglo de fragmentos
 * de texto/elemento listo para renderizar en JSX (evita el uso de
 * dangerouslySetInnerHTML).
 * @param {string} texto - Texto original.
 * @param {string} query - Término a resaltar.
 * @returns {(string|JSX.Element)[]}
 */
export function resaltarTexto(texto, query) {
  if (!query) return [texto];
  const partes = texto.split(new RegExp(`(${query})`, 'gi'));
  return partes.map((parte, i) =>
    parte.toLowerCase() === query.toLowerCase()
      ? { resaltado: true, texto: parte, key: i }
      : { resaltado: false, texto: parte, key: i }
  );
}

/**
 * Catálogo de medicamentos compartido entre los módulos del sistema.
 * Simula los datos que en producción vendrían de la base de datos
 * (tabla `productos`) a través de una API.
 */
export const CATALOGO = [
  { id: 1, name: 'Amoxicilina 500mg', cat: 'Antibiótico', price: 18500, stock: 245, venc: 'Dic 2026', lab: 'Tecnoquímicas S.A.', estado: 'ok' },
  { id: 2, name: 'Ibuprofeno 400mg', cat: 'Analgésico', price: 12000, stock: 180, venc: 'Mar 2027', lab: 'Bayer Colombia', estado: 'ok' },
  { id: 3, name: 'Loratadina 10mg', cat: 'Alérgico', price: 8500, stock: 320, venc: 'Ago 2027', lab: 'Genfar S.A.', estado: 'ok' },
  { id: 4, name: 'Omeprazol 20mg', cat: 'Gastro', price: 15000, stock: 12, venc: 'Mar 2026', lab: 'Tecnoquímicas S.A.', estado: 'bajo' },
  { id: 5, name: 'Vitamina C 500mg', cat: 'Vitamina', price: 9500, stock: 200, venc: 'Jun 2027', lab: 'Procaps S.A.', estado: 'ok' },
  { id: 6, name: 'Metformina 850mg', cat: 'Diabetes', price: 22000, stock: 90, venc: 'Nov 2026', lab: 'Genfar S.A.', estado: 'ok' },
  { id: 7, name: 'Atorvastatina 20mg', cat: 'Cardiovascular', price: 35000, stock: 55, venc: 'Ene 2027', lab: 'Pfizer Colombia', estado: 'ok' },
  { id: 8, name: 'Clorfenamina 4mg', cat: 'Alérgico', price: 6000, stock: 0, venc: 'Ene 2026', lab: 'Tecnoquímicas S.A.', estado: 'agotado' },
];

/**
 * Usuarios válidos del sistema (simulados), usados por el módulo de login.
 * En producción esto se reemplaza por la consulta al backend (API REST).
 */
export const USUARIOS = [
  { user: 'admin', pass: '1234', rol: 'Empleado · Admin' },
  { user: 'carlos', pass: '1234', rol: 'Empleado' },
  { user: 'cliente', pass: '1234', rol: 'Cliente' },
];
