package com.farma30.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

@WebServlet(name = "RegistrarServlet", urlPatterns = {"/RegistrarServlet"})
public class RegistrarServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String nombre = request.getParameter("txtNombreReg");
        String correo = request.getParameter("txtCorreoReg");
        String contrasena = request.getParameter("txtContrasenaReg");
        String rolForm = request.getParameter("cmbRolReg");

        if (nombre == null || correo == null || contrasena == null || rolForm == null
                || nombre.isEmpty() || correo.isEmpty() || contrasena.isEmpty() || rolForm.isEmpty()) {
            response.sendRedirect("Registro.html?error=campos_vacios");
            return;
        }

        // SOLUCIÓN CASO 2: normalizar el rol a minúsculas para que coincida
        // exactamente con los valores del ENUM('admin','empleado','cliente')
        String rol = rolForm.trim().toLowerCase();
        if (!rol.equals("admin") && !rol.equals("empleado") && !rol.equals("cliente")) {
            response.sendRedirect("Registro.html?error=rol_invalido");
            return;
        }

        // Nombre de columna correcto según tu tabla real: contrasena_hash
        String sql = "INSERT INTO usuarios (nombre, correo, contrasena_hash, rol) VALUES (?, ?, ?, ?)";

        Connection con = null;
        PreparedStatement ps = null;

        try {
            con = com.farma30.conexion.ConexionBD.obtenerConexion();

            if (con != null) {
                ps = con.prepareStatement(sql);
                ps.setString(1, nombre);
                ps.setString(2, correo);
                ps.setString(3, contrasena);
                ps.setString(4, rol);

                int filasInsertadas = ps.executeUpdate();

                if (filasInsertadas > 0) {
                    response.sendRedirect("index.html?registro=success");
                } else {
                    response.sendRedirect("Registro.html?error=no_guardado");
                }
            } else {
                response.sendRedirect("Registro.html?error=sin_conexion");
            }

        } catch (SQLIntegrityConstraintViolationException e) {
            // SOLUCIÓN CASO 1: capturar específicamente el correo duplicado
            // (columna correo tiene UNIQUE KEY) y dar un mensaje claro
            System.err.println("Correo duplicado: " + e.getMessage());
            response.sendRedirect("Registro.html?error=correo_duplicado");
        } catch (SQLException e) {
            System.err.println("Error SQL al registrar usuario: " + e.getMessage());
            response.sendRedirect("Registro.html?error=sql_exception");
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (con != null) {
                    con.close();
                }
            } catch (SQLException ex) {
                System.err.println("Error al cerrar recursos: " + ex.getMessage());
            }
        }
    }
}
