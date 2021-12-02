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
        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().get(); //Obtenemos las colleciones de datos que esta en FireBase
        try {
            for (DocumentSnapshot doc : querySnapshotApiFuture.get().getDocuments()){//Recorremos las colleciones
                usuario = doc.toObject(Usuario.class);//Casteamos la coleccion al objeto Usuario.class
                usuario.setId(doc.getId()); // Le inyectamos a nuestro objeto el id de la coleccion
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
        DocumentReference documentReference = getCollection().document(id); // Obtenemos la collecion la cual concuerda con el ID pasado por parametro
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
        Map<String, Object> docAdd = getStringObjectMap(usuario);//Guardamos el objeto que llega en un arreglo Map
        CollectionReference usuarios = getCollection(); // Obtenemos todas las colleciones
        ApiFuture<WriteResult> writeResultApiFuture = usuarios.document().create(docAdd); // Le enviamos la nueva lista de map a FireBase
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
        Map<String, Object> docEdit = getStringObjectMap(usuario); //Guardamos el objeto que llega en un arreglo Map
        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).set(docEdit);// Obtenemos el arreglo por el ID que pasamos por parametro y le enviamos la nueva lista de map a FireBase
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
        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).delete();  //Obtenemos el arreglo por el ID que pasamos por parametro y eliminamos la collecion
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

    //Obtenemos las collecciones (Datos) de la tabla cursos
    private CollectionReference getCollection(){
       return fireBase.firestore().collection("usuarios");
    }
}
