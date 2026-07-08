package com.farma30.servlet;

import com.farma30.dao.ProductoDAO;
import com.farma30.rf02catalogo.model.Producto;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * Servlet que muestra el catálogo de productos tras un inicio de
 * sesión exitoso. Verifica que exista una sesión activa antes de
 * mostrar la información (control de acceso).
 */
@WebServlet(name = "CatalogoServlet", urlPatterns = {"/CatalogoServlet"})
public class CatalogoServlet extends HttpServlet {

    private final ProductoDAO productoDAO = new ProductoDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Control de acceso: solo usuarios con sesión activa pueden ver el catálogo
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("usuarioLogueado") == null) {
            response.sendRedirect("index.html?error=sesion_requerida");
            return;
        }

        List<Producto> productos = productoDAO.listarProductos();
        request.setAttribute("productos", productos);

        RequestDispatcher dispatcher = request.getRequestDispatcher("/catalogo.jsp");
        dispatcher.forward(request, response);
    }
}