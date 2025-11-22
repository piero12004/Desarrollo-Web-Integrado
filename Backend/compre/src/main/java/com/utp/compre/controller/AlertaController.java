package com.utp.compre.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.utp.compre.model.Alerta;
import com.utp.compre.model.Usuario;
import com.utp.compre.repository.AlertaRepository;
import com.utp.compre.repository.UsuarioRepository;

public class AlertaController {
    @Autowired
    private AlertaRepository alertaRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @PostMapping("/crear")
    public Alerta crear(@RequestBody Alerta alerta) {
        return alertaRepo.save(alerta);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Alerta> listarPorUsuario(@PathVariable Integer usuarioId) {
        Usuario user = usuarioRepo.findById(usuarioId).orElse(null);
        return alertaRepo.findByUsuarioAndActivo(user, true);
    }

    @PutMapping("/desactivar/{id}")
    public void desactivar(@PathVariable Integer id) {
        Alerta alerta = alertaRepo.findById(id).orElse(null);
        if (alerta != null) {
            alerta.setActivo(false);
            alertaRepo.save(alerta);
        }
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        alertaRepo.deleteById(id);
    }
}
