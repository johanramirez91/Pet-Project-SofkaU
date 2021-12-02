package co.com.sofka.PETProject.SofkaU.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.InputStream;

@Service
public class ConfigFireBase {

    @PostConstruct
    private void iniFireStore() throws Exception{
        InputStream serviceAccount = getClass().getClassLoader().
                getResourceAsStream("ServiceFirebaseJson.json"); //Se lee el archivo ServiceFirebaseJson que es el que trae las credenciales de firestore

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://pet-project-sofkau.firebaseio.com/") //Se especifica la ruta de la base de datos
                .build();

        if(FirebaseApp.getApps().isEmpty()){
            FirebaseApp.initializeApp(options);
        }
    }

    public Firestore firestore() {//Tomamos la instancia creada de FireBase
        return FirestoreClient.getFirestore();
    }

}
