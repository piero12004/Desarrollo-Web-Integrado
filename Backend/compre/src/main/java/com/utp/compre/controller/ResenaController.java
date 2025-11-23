package com.utp.compre.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utp.compre.model.Resena;
import com.utp.compre.model.Usuario;
import com.utp.compre.repository.ResenaRepository;
import com.utp.compre.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/resena")
@CrossOrigin("*")
public class ResenaController {
    @Autowired
    private ResenaRepository reseñaRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @PostMapping("/crear")
    public Resena crear(@RequestBody Resena reseña) {
        return reseñaRepo.save(reseña);
    }

    @GetMapping("/producto/{productoApiId}")
    public List<Resena> obtenerPorProducto(@PathVariable String productoApiId) {
        return reseñaRepo.findByProductoApiId(productoApiId);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Resena> obtenerPorUsuario(@PathVariable Integer usuarioId) {
        Usuario user = usuarioRepo.findById(usuarioId).orElse(null);
        return reseñaRepo.findByUsuario(user);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        reseñaRepo.deleteById(id);
    }
}
