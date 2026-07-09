<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Modelo Eloquent de la entidad Producto.
 * Mapea a la tabla `productos`, igual que el proyecto Java original.
 */
class Producto extends Model
{
    protected $table = 'productos';
    protected $primaryKey = 'id_producto';
    public $timestamps = false; // la tabla original no tiene created_at/updated_at

    protected $fillable = [
        'nombre',
        'descripcion',
        'categoria',
        'precio',
        'stock',
    ];
}
