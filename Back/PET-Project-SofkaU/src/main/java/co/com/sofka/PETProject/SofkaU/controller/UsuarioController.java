package co.com.sofka.PETProject.SofkaU.controller;

import co.com.sofka.PETProject.SofkaU.modeldto.Usuario;
import co.com.sofka.PETProject.SofkaU.service.UsuarioServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/usuario")
@CrossOrigin(origins = "http://localhost:3000/")
public class UsuarioController {

    @Autowired
    UsuarioServiceImp service;

    @GetMapping("/listar")
    public ResponseEntity listar(){
        return new ResponseEntity(service.list(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Usuario usuario){
        return new ResponseEntity(service.add(usuario), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity edit(@PathVariable(value = "id") String id, @RequestBody Usuario usuario){
        return new ResponseEntity(service.edit(id,usuario), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") String id){
        return new ResponseEntity(service.delete(id), HttpStatus.OK);
    }
}
