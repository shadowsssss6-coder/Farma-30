<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modelo Eloquent de la entidad Usuario.
 * Mapea a la tabla `usuarios`, igual que el proyecto Java original.
 */
class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';
    public $timestamps = false; // la tabla original no tiene created_at/updated_at

    protected $fillable = [
        'nombre',
        'correo',
        'contrasena_hash',
        'rol',
        'activo',
    ];

    protected $hidden = [
        'contrasena_hash',
    ];
}
