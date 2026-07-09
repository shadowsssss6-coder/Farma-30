<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Controlador de autenticación.
 * Equivalente en Laravel de: LoginServlet.java, RegistrarServlet.java y LogoutServlet.java
 */
class AuthController extends Controller
{
    /** Muestra el formulario de login. Equivalente a index.html */
    public function mostrarLogin()
    {
        return view('auth.login');
    }

    /** Procesa el login. Equivalente a LoginServlet.doPost() */
    public function login(Request $request)
    {
        $identificacion = trim((string) $request->input('txtUsuario', ''));
        $contrasena = (string) $request->input('txtContrasena', '');

        if ($identificacion === '' || $contrasena === '') {
            return redirect()->route('login')->with('error', 'campos_vacios');
        }

        $usuario = Usuario::where('correo', $identificacion)
            ->orWhere('nombre', $identificacion)
            ->first();

        if ($usuario !== null && $usuario->contrasena_hash === $contrasena) {
            // Login correcto: crear sesión (equivalente a session.setAttribute("usuarioLogueado", ...))
            $request->session()->put('usuarioLogueado', $usuario);
            $request->session()->regenerate();

            return redirect()->route('catalogo');
        }

        return redirect()->route('login')->with('error', 'invalid');
    }

    /** Muestra el formulario de registro. Equivalente a Registro.html */
    public function mostrarRegistro()
    {
        return view('auth.registro');
    }

    /** Procesa el registro. Equivalente a RegistrarServlet.doPost() */
    public function registrar(Request $request)
    {
        $nombre = trim((string) $request->input('txtNombreReg', ''));
        $correo = trim((string) $request->input('txtCorreoReg', ''));
        $contrasena = (string) $request->input('txtContrasenaReg', '');
        $rolForm = trim((string) $request->input('cmbRolReg', ''));

        if ($nombre === '' || $correo === '' || $contrasena === '' || $rolForm === '') {
            return redirect()->route('registro')->with('error', 'campos_vacios');
        }

        // Normalizar el rol a minúsculas para que coincida con el ENUM('admin','empleado','cliente')
        $rol = strtolower($rolForm);
        if (!in_array($rol, ['admin', 'empleado', 'cliente'], true)) {
            return redirect()->route('registro')->with('error', 'rol_invalido');
        }

        try {
            Usuario::create([
                'nombre' => $nombre,
                'correo' => $correo,
                'contrasena_hash' => $contrasena,
                'rol' => $rol,
                'activo' => true,
            ]);

            return redirect()->route('login')->with('registro', 'success');
        } catch (QueryException $e) {
            // Código 23000 = violación de restricción de integridad (correo duplicado, UNIQUE KEY)
            if ($e->getCode() === '23000') {
                Log::warning('Correo duplicado: ' . $e->getMessage());
                return redirect()->route('registro')->with('error', 'correo_duplicado');
            }

            Log::error('Error SQL al registrar usuario: ' . $e->getMessage());
            return redirect()->route('registro')->with('error', 'sql_exception');
        }
    }

    /** Cierra la sesión. Equivalente a LogoutServlet.doGet() */
    public function logout(Request $request)
    {
        $request->session()->forget('usuarioLogueado');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')->with('logout', 'success');
    }
}
