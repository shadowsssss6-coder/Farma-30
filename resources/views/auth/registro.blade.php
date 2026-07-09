@php
    $mensajes = [
        'campos_vacios' => 'Todos los campos son obligatorios.',
        'sin_conexion' => 'No se pudo conectar con la base de datos.',
        'sql_exception' => 'Ocurrió un error al guardar. Intenta de nuevo.',
        'no_guardado' => 'No se pudo guardar el registro.',
        'correo_duplicado' => 'Este correo ya está registrado. Inicia sesión o usa otro correo.',
        'rol_invalido' => 'El rol seleccionado no es válido.',
    ];
    $error = session('error');
@endphp
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Usuarios - Farma 30</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f0f2f5; }
        .text-principal { color: #1a1a1a; }
        .text-enlace { color: #3498db; }
        .bg-boton { background-color: #2ecc71; }
        .bg-boton:hover { background-color: #27ae60; }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-center items-center p-4">

    <div class="w-full max-w-md flex flex-col items-center">

        <h1 class="text-xl font-bold text-principal mb-1">Droguería Farma 30</h1>
        <p class="text-sm text-gray-500 mb-6">Crear una nueva cuenta en el sistema</p>

        <div class="bg-white w-full rounded-xl shadow-md border border-gray-100 p-6">

            @if($error && isset($mensajes[$error]))
                <div class="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {{ $mensajes[$error] }}
                </div>
            @endif

            <form action="{{ route('registro.post') }}" method="POST" class="space-y-4">
                @csrf

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Nombres y apellidos</label>
                    <input type="text" id="txtNombreReg" name="txtNombreReg" required placeholder="Ej: Juan Pérez"
                           value="{{ old('txtNombreReg') }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-800">
                    <p id="errorNombre" class="hidden text-xs text-red-600 mt-1">
                        El nombre solo puede contener letras y espacios, entre 3 y 50 caracteres.
                    </p>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
                    <input type="email" name="txtCorreoReg" required placeholder="juan@farma30.com"
                           value="{{ old('txtCorreoReg') }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm text-gray-800">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                    <input type="password" name="txtContrasenaReg" required placeholder="••••••••"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm text-gray-800">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Rol de Usuario</label>
                    <select name="cmbRolReg" class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 focus:outline-none">
                        <option value="cliente">Cliente</option>
                        <option value="empleado">Empleado</option>
                    </select>
                </div>

                <button type="submit" class="w-full bg-boton text-white font-medium py-2.5 px-4 rounded-md transition duration-200 text-sm uppercase tracking-wider shadow-sm mt-2">
                    Registrar Cuenta
                </button>
            </form>

            <div class="text-center mt-4 text-xs text-gray-500">
                ¿Ya tienes una cuenta? <a href="{{ route('login') }}" class="text-enlace hover:underline font-medium">Inicia sesión</a>
            </div>
        </div>
    </div>

    <script>
        const inputNombre = document.getElementById('txtNombreReg');
        const errorNombre = document.getElementById('errorNombre');
        const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;

        inputNombre.addEventListener('input', function () {
            if (regexNombre.test(inputNombre.value.trim())) {
                errorNombre.classList.add('hidden');
                inputNombre.classList.remove('border-red-500', 'ring-red-500');
                inputNombre.classList.add('border-gray-300');
            } else {
                errorNombre.classList.remove('hidden');
                inputNombre.classList.remove('border-gray-300');
                inputNombre.classList.add('border-red-500', 'ring-red-500');
            }
        });

        document.querySelector('form').addEventListener('submit', function (e) {
            if (!regexNombre.test(inputNombre.value.trim())) {
                e.preventDefault();
                errorNombre.classList.remove('hidden');
                inputNombre.classList.add('border-red-500', 'ring-red-500');
                inputNombre.focus();
            }
        });
    </script>

</body>
</html>
