package co.com.sofka.PETProject.SofkaU.controller;

import co.com.sofka.PETProject.SofkaU.modeldto.Curso;
import co.com.sofka.PETProject.SofkaU.service.CursoServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/curso")
@CrossOrigin //Utilizamos esta anotacion para permitir el intercambio de solicitudes HTTPs
public class CursoController {

    @Autowired
    CursoServiceImp service; //Creamos una instancia de CursoServiceImp, la cual tiene los metodos que utilizamos para el crud

    @GetMapping("/listar")
    public ResponseEntity listar(){
        return new ResponseEntity(service.list(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity getid(@PathVariable(value = "id") String id){
        return new ResponseEntity(service.getById(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Curso curso){
        return new ResponseEntity(service.add(curso), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity edit(@PathVariable(value = "id") String id, @RequestBody Curso curso){
        return new ResponseEntity(service.edit(id,curso), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") String id){
        return new ResponseEntity(service.delete(id), HttpStatus.OK);
    }
}
