package com.farma30.dao;

import com.farma30.rf01login.model.usuario;
import com.farma30.util.ConexionBD;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UsuarioDAO {
    
    public boolean insertarUsuario(usuario user) {
        // Ajustado exactamente a las columnas de la imagen image_34e13c.png
        String sql = "INSERT INTO usuarios (nombre, correo, contrasena_hash, rol, intentos_fallidos) VALUES (?, ?, ?, ?, ?)";
        
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            
            ps.setString(1, user.getNombre());
            ps.setString(2, user.getCorreo());
            ps.setString(3, user.getContrasena()); // Esto se guardará en contrasena_hash
            ps.setString(4, user.getRol());
            ps.setInt(5, 0); // Inicializamos los intentos fallidos en 0 por defecto
            
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error en el DAO al insertar: " + e.getMessage());
            return false;
        }
    }

    
        
    
}