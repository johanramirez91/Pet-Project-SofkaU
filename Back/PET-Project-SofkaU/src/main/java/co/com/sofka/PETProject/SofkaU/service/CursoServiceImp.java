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

    @Override
    public List<Curso> list() {
        List<Curso> response = new ArrayList<>();
        Curso curso;
        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().get();
        try {
            for (DocumentSnapshot doc : querySnapshotApiFuture.get().getDocuments()){
                curso = doc.toObject(Curso.class);
                curso.setId(doc.getId());
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
        DocumentReference documentReference = getCollection().document(id);
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
        Map<String, Object> docAdd = getStringObjectMap(curso);
        CollectionReference cursos = getCollection();
        ApiFuture<WriteResult> writeResultApiFuture = cursos.document().create(docAdd);
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
    public Boolean edit(String id, Curso curso) {
        Map<String, Object> docEdit = getStringObjectMap(curso);
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

    private Map<String, Object> getStringObjectMap(Curso curso) {
        Map<String, Object> docAdd = new HashMap<>();
        docAdd.put("Nombre", curso.getNombre());
        docAdd.put("Descripcion", curso.getDescripcion());
        docAdd.put("Duracion", curso.getDuracion());
        docAdd.put("Precio", curso.getPrecio());
        docAdd.put("Disponibilidad", curso.getDisponibilidad());
        return docAdd;
    }

    private CollectionReference getCollection(){
       return fireBase.firestore().collection("cursos");
    }
}
