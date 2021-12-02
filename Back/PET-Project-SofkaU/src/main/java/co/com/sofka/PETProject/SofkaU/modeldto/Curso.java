package co.com.sofka.PETProject.SofkaU.modeldto;

import lombok.Data;

@Data
public class Curso {

    private String id;
    private String Nombre;
    private String Descripcion;
    private Double Precio;
    private String Disponibilidad;
    private int Duracion;

}
