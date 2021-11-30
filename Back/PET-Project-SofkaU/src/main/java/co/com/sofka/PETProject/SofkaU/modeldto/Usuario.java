package co.com.sofka.PETProject.SofkaU.modeldto;

import lombok.Data;

@Data
public class Usuario {

    private String Id;
    private Rol rol;
    private String Nombre;
    private String Email;
    private String Telefono;
    private String Ubicacion;
    private String FechaIngreso;

}
