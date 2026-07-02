package com.farma30.main;

import com.farma30.dao.UsuarioDAO;
import com.farma30.rf01login.model.usuario; // Tu modelo de usuario

public class Main {

    // Revisa que esta línea exacta no tenga errores de escritura:
    public static void main(String[] args) {
        
        // Aquí adentro va tu lógica de prueba:
        UsuarioDAO usuarioDao = new UsuarioDAO();
        usuario nuevoUsuario = new usuario(0, "Juan Esteban", "juan@correo.com", "clave123", "Admin", true);
        
        if (usuarioDao.insertarUsuario(nuevoUsuario)) {
            System.out.println("¡Usuario registrado correctamente!");
        } else {
            System.out.println("No se pudo registrar el usuario.");
        }
    }
}