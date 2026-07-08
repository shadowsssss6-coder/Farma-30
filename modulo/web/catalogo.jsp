<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Farma 30 - Catálogo de Productos</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#f0f2f5] min-h-screen p-6">

<div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-bold text-[#1a1a1a]">
            Bienvenido, ${sessionScope.usuarioLogueado.nombre}
        </h1>
        <a href="LogoutServlet" class="text-sm text-red-600 hover:underline">Cerrar sesión</a>
    </div>

    <h2 class="text-lg font-semibold mb-4">Catálogo de Productos</h2>

    <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <table class="w-full text-sm">
            <thead class="bg-[#1f3864] text-white">
                <tr>
                    <th class="p-3 text-left">Nombre</th>
                    <th class="p-3 text-left">Categoría</th>
                    <th class="p-3 text-left">Precio</th>
                    <th class="p-3 text-left">Stock</th>
                </tr>
            </thead>
            <tbody>
                <c:choose>
                    <c:when test="${empty productos}">
                        <tr><td colspan="4" class="p-4 text-center text-gray-500">No hay productos registrados.</td></tr>
                    </c:when>
                    <c:otherwise>
                        <c:forEach var="p" items="${productos}">
                            <tr class="border-b border-gray-100">
                                <td class="p-3">${p.nombre}</td>
                                <td class="p-3">${p.categoria}</td>
                                <td class="p-3">$${p.precio}</td>
                                <td class="p-3">${p.stock}</td>
                            </tr>
                        </c:forEach>
                    </c:otherwise>
                </c:choose>
            </tbody>
        </table>
    </div>
</div>

</body>
</html>