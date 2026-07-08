package com.farma30.dao;

import com.farma30.conexion.ConexionBD;
import com.farma30.rf02catalogo.model.Producto;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Clase de acceso a datos (DAO) para la entidad Producto.
 * Reutiliza la misma ConexionBD centralizada que UsuarioDAO.
 */
public class ProductoDAO {

    /** Lista todos los productos del catálogo, ordenados por nombre. */
    public List<Producto> listarProductos() {
        List<Producto> productos = new ArrayList<>();
        String sql = "SELECT id_producto, nombre, descripcion, categoria, precio, stock " +
                     "FROM productos ORDER BY nombre ASC";

        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Producto p = new Producto();
                p.setIdProducto(rs.getInt("id_producto"));
                p.setNombre(rs.getString("nombre"));
                p.setDescripcion(rs.getString("descripcion"));
                p.setCategoria(rs.getString("categoria"));
                p.setPrecio(rs.getDouble("precio"));
                p.setStock(rs.getInt("stock"));
                productos.add(p);
            }
        } catch (SQLException e) {
            System.err.println("Error al listar productos: " + e.getMessage());
        }
        return productos;
    }
}