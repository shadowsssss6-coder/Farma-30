<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        $productos = [
            ['nombre' => 'Acetaminofén 500mg', 'descripcion' => 'Analgésico y antipirético, caja x20', 'categoria' => 'Analgésicos', 'precio' => 8500, 'stock' => 120],
            ['nombre' => 'Ibuprofeno 400mg', 'descripcion' => 'Antiinflamatorio, caja x10', 'categoria' => 'Antiinflamatorios', 'precio' => 12000, 'stock' => 80],
            ['nombre' => 'Alcohol Antiséptico 350ml', 'descripcion' => 'Uso tópico', 'categoria' => 'Higiene', 'precio' => 6500, 'stock' => 60],
            ['nombre' => 'Vitamina C 1g', 'descripcion' => 'Suplemento, tubo x10 tabletas', 'categoria' => 'Vitaminas', 'precio' => 15000, 'stock' => 45],
        ];

        foreach ($productos as $producto) {
            Producto::create($producto);
        }
    }
}
