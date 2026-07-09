# Farma 30 — Front-end (React)

**Evidencia:** GA7-220501096-AA4-EV03 — Componente front-end del proyecto formativo
**Proyecto formativo:** Sistema de Gestión "Droguería Farma 30"
**Framework aplicado:** React 18 + React Router DOM (Vite)

## 1. Descripción

Este proyecto es la migración del prototipo front-end original (15 módulos
independientes en HTML/CSS/JavaScript, uno por cada requerimiento
funcional RF01–RF15) hacia una **Single Page Application** construida con
**React**, manteniendo exactamente el mismo diseño visual (CSS original)
y la misma lógica funcional de cada módulo, pero codificada mediante
componentes, estado (`useState`), efectos (`useEffect`), contexto
(`Context API`) y enrutamiento del lado del cliente (`React Router`).

## 2. Relación con los artefactos previos del proyecto

- **Prototipos HTML/CSS/JS:** cada componente de `src/pages/RFxx*.jsx`
  es la migración 1:1 del archivo `RFxx_.../*.html` + `*.js` correspondiente,
  conservando la estructura visual, textos, clases CSS y flujo de
  interacción originalmente diseñados.
- **Diagrama de clases / historias de usuario:** los datos simulados
  (`CATALOGO`, `USUARIOS` en `src/utils/globalUtils.js`) representan las
  entidades Producto y Usuario definidas en el diagrama de clases del
  proyecto.
- **Casos de uso:** el control de acceso por sesión (`RutaProtegida.jsx`)
  implementa el caso de uso "Iniciar sesión / Controlar acceso a
  módulos", reutilizando el mismo comportamiento definido en las
  evidencias de backend (Servlets/PHP) de fases anteriores, ahora
  aplicado del lado del cliente.

## 3. Framework y justificación

Se seleccionó **React** por ser uno de los frameworks de front-end vistos
en el componente formativo, adecuado para este proyecto porque:

- Permite convertir los 15 módulos duplicados (HTML+CSS+JS repetido) en
  **componentes reutilizables** (`TopBar`, `RutaProtegida`, contexto de
  sesión y de notificaciones), eliminando la duplicación de código que
  tenía el prototipo original (el `<header class="top-bar">` y la
  lógica de `mostrarToast()` estaban copiados y pegados en los 15
  archivos HTML).
- Su sistema de **componentes + estado** reemplaza la manipulación
  directa del DOM (`document.getElementById(...).innerHTML = ...`) del
  prototipo original por un modelo declarativo, más mantenible y con
  menos posibilidad de errores.
- **React Router** reemplaza la navegación por enlaces `<a href="...">`
  entre archivos `.html` independientes por rutas de una sola aplicación
  (SPA), sin recargar la página completa entre módulos.

## 4. Estructura del proyecto

```
farma30-react/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx              # Punto de entrada (Router + Providers)
│   ├── App.jsx                # Definición de las 15 rutas
│   ├── components/
│   │   ├── TopBar.jsx         # Barra superior reutilizable (header)
│   │   └── RutaProtegida.jsx  # Control de acceso por sesión
│   ├── utils/
│   │   ├── globalUtils.js     # CATALOGO, USUARIOS, formatPrecio, resaltarTexto
│   │   ├── SesionContext.jsx  # Contexto de sesión (reemplaza sessionStorage directo)
│   │   └── ToastContext.jsx   # Contexto de notificaciones (reemplaza mostrarToast)
│   ├── styles/                 # CSS original de cada módulo (sin modificar)
│   └── pages/
│       ├── RF01Login.jsx
│       ├── RF02Inventario.jsx
│       ├── RF03Ventas.jsx
│       ├── RF04Gestion.jsx
│       ├── RF05Deseados.jsx
│       ├── RF06Registro.jsx
│       ├── RF07Vencimientos.jsx
│       ├── RF08Detalle.jsx
│       ├── RF09Notificaciones.jsx
│       ├── RF10Descuentos.jsx
│       ├── RF11Promos.jsx
│       ├── RF12EmpDescuentos.jsx
│       ├── RF13Horarios.jsx
│       ├── RF14Busqueda.jsx
│       └── RF15Scanner.jsx
```

## 5. Mapa de navegación (rutas)

| Ruta                     | Módulo                          |
|---------------------------|----------------------------------|
| `/rf01-login`              | RF01 · Inicio de sesión           |
| `/rf02-inventario`         | RF02 · Consulta de inventario     |
| `/rf03-ventas`             | RF03 · Resumen de ventas          |
| `/rf04-gestion`            | RF04 · Gestión de inventario      |
| `/rf05-deseados`           | RF05 · Lista de deseados          |
| `/rf06-registro`           | RF06 · Registro de ventas         |
| `/rf07-vencimientos`       | RF07 · Alertas de vencimiento     |
| `/rf08-detalle`            | RF08 · Detalle de ventas          |
| `/rf09-notificaciones`     | RF09 · Notificaciones             |
| `/rf10-descuentos`         | RF10 · Gestión de descuentos      |
| `/rf11-promos`             | RF11 · Descuentos para clientes   |
| `/rf12-emp-descuentos`     | RF12 · Descuentos para empleados  |
| `/rf13-horarios`           | RF13 · Horarios de atención       |
| `/rf14-busqueda`           | RF14 · Búsqueda avanzada          |
| `/rf15-scanner`            | RF15 · Escáner de código de barras|

Todas las rutas, salvo `/rf01-login`, están protegidas por sesión activa
(`RutaProtegida`) y redirigen al login si no hay un usuario autenticado.

## 6. Usuarios de prueba (simulados)

| Usuario   | Contraseña | Rol               |
|-----------|------------|-------------------|
| admin     | 1234       | Empleado · Admin  |
| carlos    | 1234       | Empleado          |
| cliente   | 1234       | Cliente           |

## 7. Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Luego abrir `http://localhost:5173` en el navegador. La aplicación
redirige automáticamente al módulo de inicio de sesión (RF01).

Para generar la build de producción:
```bash
npm run build
npm run preview
```

## 8. Correcciones aplicadas respecto al prototipo original

Durante la migración se detectó que 14 de los 15 archivos HTML del
prototipo original contenían una segunda etiqueta `<body>` duplicada al
final del archivo (un bloque de código de un menú lateral que nunca
llegó a integrarse realmente, dejado como comentario/borrador). Ese
HTML duplicado e inválido no se migró; solo se tomó como base el
contenido válido y realmente utilizado por cada módulo (el `<header
class="top-bar">` de navegación superior).

## 9. Control de versiones

El proyecto se inicializó con `git init` y cuenta con un historial de
commits incrementales documentando la migración módulo por módulo. El
enlace del repositorio remoto se encuentra en `enlace_repositorio.txt`.
