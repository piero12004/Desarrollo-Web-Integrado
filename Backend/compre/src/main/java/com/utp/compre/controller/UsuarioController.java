package com.utp.compre.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utp.compre.model.Usuario;
import com.utp.compre.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin("*")
public class UsuarioController {

    private final PasswordEncoder passwordEncoder;
    

    @Autowired
    private UsuarioRepository usuarioRepo;

    UsuarioController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/registrar")
    public Usuario registrar(@RequestBody Usuario usuario){
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepo.save(usuario);
    }

    @GetMapping("/{id}")
    public Usuario buscar(@PathVariable Integer id){
        return usuarioRepo.findById(id).orElse(null);
    }

    @GetMapping("/email/{email}")
    public Usuario buscarPorEmail(@PathVariable String email){
        return usuarioRepo.findByEmail(email);
    }

    @GetMapping("/listar")
    public List<Usuario> listar(){
        return usuarioRepo.findAll();
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id){
        usuarioRepo.deleteById(id);
    }
}
