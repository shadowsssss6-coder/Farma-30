<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

/**
 * Controlador del catálogo de productos.
 * Equivalente en Laravel de: CatalogoServlet.java + catalogo.jsp
 */
class CatalogoController extends Controller
{
    public function index(Request $request)
    {
        // Control de acceso: solo usuarios con sesión activa pueden ver el catálogo
        if (!$request->session()->has('usuarioLogueado')) {
            return redirect()->route('login')->with('error', 'sesion_requerida');
        }

        $usuarioLogueado = $request->session()->get('usuarioLogueado');
        $productos = Producto::orderBy('nombre', 'asc')->get();

        return view('catalogo.index', compact('usuarioLogueado', 'productos'));
    }
}
