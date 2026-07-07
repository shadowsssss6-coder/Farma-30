package com.farma30.dao;

import com.farma30.conexion.ConexionBD;
import com.farma30.rf01login.model.usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UsuarioDAO {

    // --- MÉTODO PARA INSERCIÓN (REGISTRO NUEVO) ---
    public boolean insertarUsuario(usuario user) {
        String sql = "INSERT INTO usuarios (nombre, correo, contrasena, rol, activo) VALUES (?, ?, ?, ?, ?)";

        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, user.getNombre());
            ps.setString(2, user.getCorreo());
            ps.setString(3, user.getContrasena());
            ps.setString(4, user.getRol());
            ps.setBoolean(5, true);

            int filasAfectadas = ps.executeUpdate();
            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.err.println("Error en el DAO al insertar: " + e.getMessage());
            return false;
        }
    }

    // --- MÉTODO PARA EL LOGIN ---
    public usuario buscarPorCorreoOIdentificacion(String identificacion) {
        String sql = "SELECT * FROM usuarios WHERE correo = ? OR nombre = ?";
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, identificacion);
            ps.setString(2, identificacion);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    usuario user = new usuario();
                    user.setIdUsuario(rs.getInt("id_usuario"));
                    user.setNombre(rs.getString("nombre"));
                    user.setCorreo(rs.getString("correo"));
                    user.setContrasena(rs.getString("contrasena"));
                    user.setRol(rs.getString("rol"));
                    user.setActivo(rs.getBoolean("activo"));
                    return user;
                }
            }
        } catch (SQLException e) {
            System.err.println("Error en UsuarioDAO al buscar: " + e.getMessage());
        }
        return null;
    }
}