package com.farma30.rf01login.model;

public class usuario {
    private int idUsuario;
    private String nombre;
    private String correo;
    private String contrasena;
    private String rol;
    private boolean activo;

    // Constructor vacío estándar
    public usuario() {}

    // Constructor completo
    public usuario(int idUsuario, String nombre, String correo, String contrasena, String rol, boolean activo) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
        this.rol = rol;
        this.activo = activo;
    }

    // Getters y Setters con nomenclatura camelCase estándar
    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public boolean isActivo() { return activo; }
    public void setActivo(boolean activo) { this.activo = activo; }
}