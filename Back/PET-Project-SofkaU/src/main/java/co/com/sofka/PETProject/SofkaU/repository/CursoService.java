package co.com.sofka.PETProject.SofkaU.repository;

import co.com.sofka.PETProject.SofkaU.modeldto.Curso;

import java.util.List;

public interface CursoService {
    List<Curso> list();
    Boolean add(Curso curso);
    Boolean edit(String id, Curso curso);
    Boolean delete(String id);
}
