package com.farma30.servlet;

import com.farma30.dao.UsuarioDAO;
import com.farma30.rf01login.model.usuario;
import java.io.IOException;

// Cambiamos javax por jakarta para solucionar todas las líneas rojas de importación
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet(name = "LoginServlet", urlPatterns = {"/LoginServlet"})
public class LoginServlet extends HttpServlet {

    private final UsuarioDAO usuarioDao = new UsuarioDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String identificacionForm = request.getParameter("txtUsuario");
        String contrasenaForm = request.getParameter("txtContrasena");

        if (identificacionForm == null || identificacionForm.trim().isEmpty() ||
            contrasenaForm == null || contrasenaForm.trim().isEmpty()) {
            response.sendRedirect("index.html?error=campos_vacios");
            return;
        }

        try {
            // Corregido: Usamos el nombre exacto de tu método del DAO
            usuario usuarioValidado = usuarioDao.buscarPorCorreoOIdentificacion(identificacionForm.trim());

            if (usuarioValidado != null && usuarioValidado.getContrasena().equals(contrasenaForm)) {
                // Login correcto: Crear sesión
                HttpSession session = request.getSession(true);
                session.setAttribute("usuarioLogueado", usuarioValidado);
                
                response.sendRedirect("dashboard.html");
            } else {
                response.sendRedirect("index.html?error=invalid");
            }
        } catch (Exception e) {
            System.err.println("Error en LoginServlet: " + e.getMessage());
            response.sendRedirect("index.html?error=server_error");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("index.html");
    }
}