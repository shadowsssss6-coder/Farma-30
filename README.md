# Farma 30 — Versión Laravel

Este paquete contiene **solo los archivos propios del proyecto** (modelos,
controladores, migraciones, vistas y rutas). El framework Laravel en sí
(`vendor/`, `artisan`, `public/index.php`, etc.) se descarga con Composer,
no se puede empaquetar manualmente aquí.

## Paso 1 — Crear el esqueleto oficial de Laravel

Necesitas **Composer** y **PHP 8.1+** instalados (con XAMPP ya los tienes, o
instala Composer desde https://getcomposer.org).

Abre una terminal y ejecuta (usa la versión 10 para que coincida con la
estructura de este parche):

```bash
composer create-project laravel/laravel:^10.0 farma30-laravel
cd farma30-laravel
```

Esto crea un proyecto Laravel completo y funcional (vacío).

## Paso 2 — Copiar los archivos de este paquete encima

Copia el contenido de esta carpeta (`farma30-laravel-patch/`) dentro de
`farma30-laravel/`, reemplazando cuando pregunte:

```
farma30-laravel-patch/app/Models/Usuario.php              → farma30-laravel/app/Models/Usuario.php
farma30-laravel-patch/app/Models/Producto.php              → farma30-laravel/app/Models/Producto.php
farma30-laravel-patch/app/Http/Controllers/AuthController.php     → farma30-laravel/app/Http/Controllers/AuthController.php
farma30-laravel-patch/app/Http/Controllers/CatalogoController.php → farma30-laravel/app/Http/Controllers/CatalogoController.php
farma30-laravel-patch/database/migrations/*.php             → farma30-laravel/database/migrations/
farma30-laravel-patch/database/seeders/ProductoSeeder.php    → farma30-laravel/database/seeders/ProductoSeeder.php
farma30-laravel-patch/resources/views/auth/*.blade.php       → farma30-laravel/resources/views/auth/
farma30-laravel-patch/resources/views/catalogo/*.blade.php    → farma30-laravel/resources/views/catalogo/
farma30-laravel-patch/routes/web.php (reemplaza el archivo)   → farma30-laravel/routes/web.php
```

En Windows puedes simplemente arrastrar y soltar las carpetas `app`,
`database`, `resources` y `routes` de este paquete dentro de la carpeta del
proyecto Laravel, aceptando sobrescribir.

## Paso 3 — Configurar la base de datos

1. Crea la base de datos (si no la tienes ya del intento en PHP puro):
   ```sql
   CREATE DATABASE modulacion_farma_30 CHARACTER SET utf8mb4;
   ```
2. Abre `farma30-laravel/.env` y ajusta (puedes copiar/pegar desde
   `env-database.txt` incluido en este paquete):
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=modulacion_farma_30
   DB_USERNAME=root
   DB_PASSWORD=
   ```

## Paso 4 — Ejecutar las migraciones (crea las tablas)

```bash
php artisan migrate
```

Esto crea `usuarios` y `productos` automáticamente (no necesitas `schema.sql`
manual, Laravel lo hace con las migraciones).

Opcional — cargar productos de ejemplo:
```bash
php artisan db:seed --class=ProductoSeeder
```

## Paso 5 — Levantar el servidor

```bash
php artisan serve
```

Abre `http://localhost:8000` en el navegador.

## Configurar esto en NetBeans

1. **File → New Project → PHP → PHP Application with Existing Sources**
2. Selecciona la carpeta `farma30-laravel` completa (la que generó Composer,
   ya con tus archivos copiados encima)
3. En **Project Properties → Run Configuration**:
   - Run As: **PHP Built-in Web Server**
   - Project URL: `http://localhost:8000/`
   - Index File: `public/index.php`
4. Ejecuta con F6. NetBeans internamente corre lo mismo que
   `php artisan serve` (sirve la carpeta `public/`).

## Equivalencias con el proyecto Java original

| Java (original)                  | Laravel (nuevo)                              |
|-----------------------------------|-------------------------------------------------|
| `usuario.java` / `Producto.java`  | `app/Models/Usuario.php` / `Producto.php` (Eloquent) |
| `UsuarioDAO.java` / `ProductoDAO.java` | Reemplazados por Eloquent (`Usuario::where(...)`, `Producto::orderBy(...)`) |
| `ConexionBD.java`                 | `.env` + `config/database.php` (ya incluidos en Laravel) |
| `LoginServlet.java`               | `AuthController@login`                          |
| `RegistrarServlet.java`            | `AuthController@registrar`                       |
| `LogoutServlet.java`                | `AuthController@logout`                           |
| `CatalogoServlet.java`               | `CatalogoController@index`                         |
| `@WebServlet(urlPatterns={...})`      | `routes/web.php`                                    |
| `index.html` / `Registro.html`         | `resources/views/auth/login.blade.php` / `registro.blade.php` |
| `catalogo.jsp` (JSTL `<c:forEach>`)     | `resources/views/catalogo/index.blade.php` (`@forelse`) |
| Script SQL manual                        | `database/migrations/*.php` (`php artisan migrate`) |
| `HttpSession`                             | `$request->session()` / helper `session()`         |

## Notas importantes

- Igual que en la versión anterior, **las contraseñas se guardan en texto
  plano** para no alterar el comportamiento del proyecto original. Se
  recomienda migrar a `Hash::make()` / `Hash::check()` de Laravel antes de
  producción.
- Los formularios usan `@csrf` porque Laravel protege contra CSRF por
  defecto (esto no existía en el proyecto Java/PHP anterior, es un plus de
  seguridad que trae el framework).
- Los mensajes de error/éxito ahora viajan por sesión flash de Laravel
  (`session('error')`, `with('error', 'invalid')`, etc.) en vez de parámetros
  `?error=...` en la URL, aprovechando lo que ofrece el framework.
