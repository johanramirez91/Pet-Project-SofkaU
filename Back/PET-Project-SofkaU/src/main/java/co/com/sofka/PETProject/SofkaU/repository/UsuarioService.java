package co.com.sofka.PETProject.SofkaU.repository;

import co.com.sofka.PETProject.SofkaU.modeldto.Usuario;

import java.util.List;

public interface UsuarioService {
    List<Usuario> list();
    Boolean add(Usuario usuario);
    Boolean edit(String id, Usuario usuario);
    Boolean delete(String id);
}
