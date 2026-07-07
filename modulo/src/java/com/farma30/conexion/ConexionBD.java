package com.farma30.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionBD {
    private static final String URL = "jdbc:mysql://localhost:3306/modulacion_farma_30?useSSL=false&serverTimezone=UTC";
    private static final String USER = "root";
    private static final String PASSWORD = ""; // Coloca tu clave de MySQL si tienes una

    public static Connection obtenerConexion() {
        Connection conexion = null;
        try {
            // Forzar la carga del Driver JDBC en entornos Web
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexion = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Conexión exitosa a Farma-30!");
        } catch (ClassNotFoundException e) {
            System.err.println("Error: No se encontró el Driver JDBC: " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("Error de conexión a MySQL: " + e.getMessage());
        }
        return conexion;
    }
}