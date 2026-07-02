package com.farma30.main;

import com.farma30.usuarios.usuario;
import com.farma30.dao.UsuarioDAO;

public class Main {
    public static void main(String[] args) {
        System.out.println("--- Iniciando Pruebas de Módulo Usuarios ---");
        
        // 1. Creamos un usuario de prueba usando tu clase
        usuario nuevoUsuario = new usuario(0, "Juan Liscano", "juan@farma30.com", "admin123", "admin", true);
        
        // 2. Instanciamos el DAO para intentar guardarlo
        UsuarioDAO usuarioDao = new UsuarioDAO();
        boolean exito = usuarioDao.insertarUsuario(nuevoUsuario);
        
        if (exito) {
            System.out.println("¡Usuario registrado correctamente en la base de datos!");
        } else {
            System.out.println("No se pudo registrar el usuario. Revisa la consola para ver el error.");
        }
    }
}