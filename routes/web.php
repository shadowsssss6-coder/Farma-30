<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CatalogoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Rutas — equivalentes a las anotaciones @WebServlet del proyecto Java
|--------------------------------------------------------------------------
| index.html         -> GET  /            (mostrarLogin)
| LoginServlet        -> POST /login       (login)
| Registro.html        -> GET  /registro    (mostrarRegistro)
| RegistrarServlet      -> POST /registro    (registrar)
| LogoutServlet          -> GET  /logout      (logout)
| CatalogoServlet          -> GET  /catalogo   (index)
*/

Route::get('/', [AuthController::class, 'mostrarLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

Route::get('/registro', [AuthController::class, 'mostrarRegistro'])->name('registro');
Route::post('/registro', [AuthController::class, 'registrar'])->name('registro.post');

Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/catalogo', [CatalogoController::class, 'index'])->name('catalogo');
