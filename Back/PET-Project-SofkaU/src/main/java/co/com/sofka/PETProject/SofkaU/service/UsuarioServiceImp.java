package co.com.sofka.PETProject.SofkaU.service;

import co.com.sofka.PETProject.SofkaU.config.ConfigFireBase;
import co.com.sofka.PETProject.SofkaU.modeldto.Rol;
import co.com.sofka.PETProject.SofkaU.modeldto.Usuario;
import co.com.sofka.PETProject.SofkaU.repository.UsuarioService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Nullable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UsuarioServiceImp implements UsuarioService {

    @Autowired
    ConfigFireBase fireBase;

    Usuario usuario;

    @Override
    public List<Usuario> list() {
        List<Usuario> response = new ArrayList<>();
        Usuario usuario;
        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().get();
        try {
            for (DocumentSnapshot doc : querySnapshotApiFuture.get().getDocuments()){
                usuario = doc.toObject(Usuario.class);
                usuario.setId(doc.getId());
                response.add(usuario);
            }
            return  response;
        }catch (Exception e) {
            return null;
        }
    }

    @Override
    public Usuario getById(String id) {
        usuario = new Usuario();
        System.out.println("ID-->"+id);
        DocumentReference documentReference = getCollection().document(id);
        documentReference.addSnapshotListener(new EventListener<DocumentSnapshot>() {
            @Override
            public void onEvent(@Nullable DocumentSnapshot documentSnapshot, @Nullable FirestoreException e) {
                usuario.setId(id);
                usuario.setEmail(documentSnapshot.getString("Email"));
                usuario.setNombre(documentSnapshot.getString("Nombre"));
                usuario.setFechaIngreso(documentSnapshot.getString("FechaIngreso"));
                usuario.setUbicacion(documentSnapshot.getString("Ubicacion"));
                usuario.setTelefono(documentSnapshot.getString("Telefono"));
                usuario.setRol(Rol.valueOf(documentSnapshot.getString("rol")));
                System.out.println("a-->" + usuario.toString());
            }
        });
        System.out.println("f-->" + usuario.toString());
        return usuario;
    }

    @Override
    public Boolean add(Usuario usuario) {
        Map<String, Object> docAdd = getStringObjectMap(usuario);
        CollectionReference usuarios = getCollection();
        ApiFuture<WriteResult> writeResultApiFuture = usuarios.document().create(docAdd);
        try {
            if(null != writeResultApiFuture.get()){
                return true;
            }
            return false;
        }catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean edit(String id, Usuario usuario) {
        Map<String, Object> docEdit = getStringObjectMap(usuario);
        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).set(docEdit);
        try {
            if(null != writeResultApiFuture.get()){
                return true;
            }
            return false;
        }catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean delete(String id) {
        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).delete();
        try {
            if(null != writeResultApiFuture.get()){
                return true;
            }
            return false;
        }catch (Exception e) {
            return false;
        }
    }

    private Map<String, Object> getStringObjectMap(Usuario usuario) {
        Map<String, Object> docAdd = new HashMap<>();
        docAdd.put("Nombre", usuario.getNombre());
        docAdd.put("Email", usuario.getEmail());
        docAdd.put("Telefono", usuario.getTelefono());
        docAdd.put("Ubicacion", usuario.getUbicacion());
        docAdd.put("FechaIngreso", usuario.getFechaIngreso());
        docAdd.put("rol", usuario.getRol());
        return docAdd;
    }

    private CollectionReference getCollection(){
       return fireBase.firestore().collection("usuarios");
    }
}
