package co.com.sofka.PETProject.SofkaU.service;

import co.com.sofka.PETProject.SofkaU.config.ConfigFireBase;
import co.com.sofka.PETProject.SofkaU.modeldto.Curso;
import co.com.sofka.PETProject.SofkaU.repository.CursoService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CursoServiceImp implements CursoService {

    @Autowired
    ConfigFireBase fireBase;

    private boolean vacio = false;

    @Override
    public List<Curso> list() {
        List<Curso> response = new ArrayList<>();
        Curso curso;
        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().get(); //Obtenemos las colleciones de datos que esta en FireBase
        try {
            for (DocumentSnapshot doc : querySnapshotApiFuture.get().getDocuments()){ //Recorremos las colleciones
                curso = doc.toObject(Curso.class); //Casteamos la coleccion al objeto Usuario.class
                curso.setId(doc.getId()); // Le inyectamos a nuestro objeto el id de la coleccion
                response.add(curso);
            }
            return  response;
        }catch (Exception e) {
            return null;
        }
    }

    @Override
    public Curso getById(String id) {
       Curso curso =  new Curso();
        DocumentReference documentReference = getCollection().document(id);// Obtenemos la collecion la cual concuerda con el ID pasado por parametro
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        try {
            DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
            curso = documentSnapshot.toObject(Curso.class);
            curso.setId(id);
            return curso;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean add(Curso curso) {
        Map<String, Object> docAdd = getStringObjectMap(curso); //Guardamos el objeto que llega en un arreglo Map
        CollectionReference cursos = getCollection(); // Obtenemos todas las colleciones
        if(!vacio){
            ApiFuture<WriteResult> writeResultApiFuture = cursos.document().create(docAdd); // Le enviamos la nueva lista de map a FireBase
            try {
                if(null != writeResultApiFuture.get()){
                    return true;
                }
                return false;
            }catch (Exception e) {
                return false;
            }
        }
        return false;
    }

    @Override
    public Boolean edit(String id, Curso curso) {
        Map<String, Object> docEdit = getStringObjectMap(curso);//Guardamos el objeto que llega en un arreglo Map
        if(!vacio){
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
        return false;
    }

    @Override
    public Boolean delete(String id) {
        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).delete(); //Obtenemos el arreglo por el ID que pasamos por parametro y eliminamos la collecion
        try {
            if(null != writeResultApiFuture.get()){
                return true;
            }
            return false;
        }catch (Exception e) {
            return false;
        }
    }

    private Map<String, Object> getStringObjectMap(Curso curso) {
        Map<String, Object> docAdd = new HashMap<>();
        if (curso.getNombre().trim() != null && curso.getDescripcion().trim() != null && curso.getDuracion() != 0 && curso.getPrecio() != 0 && curso.getDisponibilidad().trim() != null){
            docAdd.put("Nombre", curso.getNombre());
            docAdd.put("Descripcion", curso.getDescripcion());
            docAdd.put("Duracion", curso.getDuracion());
            docAdd.put("Precio", curso.getPrecio());
            docAdd.put("Disponibilidad", curso.getDisponibilidad());
            return docAdd;
        }
        vacio = true;
        return null;
    }

    private CollectionReference getCollection(){
       return fireBase.firestore().collection("cursos"); //Obtenemos las collecciones (Datos) de la tabla cursos
    }
}
