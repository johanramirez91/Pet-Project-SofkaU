package co.com.sofka.PETProject.SofkaU.service;

import co.com.sofka.PETProject.SofkaU.config.ConfigFireBase;
import co.com.sofka.PETProject.SofkaU.modeldto.Usuario;
import co.com.sofka.PETProject.SofkaU.repository.UsuarioService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UsuarioServiceImp implements UsuarioService {

    @Autowired
    ConfigFireBase fireBase;

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
        Usuario usuario = new Usuario();
        DocumentReference documentReference = getCollection().document(id);
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        try {
            DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();;
            usuario = documentSnapshot.toObject(Usuario.class);
            usuario.setId(id);
            return usuario;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
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
