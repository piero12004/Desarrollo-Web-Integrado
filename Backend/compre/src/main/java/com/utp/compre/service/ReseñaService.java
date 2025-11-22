package com.utp.compre.service;

import java.util.List;

import com.utp.compre.model.Reseña;

public interface ReseñaService {
    Reseña crearReseña(Reseña reseña);

    List<Reseña> listarPorProducto(String productoApiId);

    List<Reseña> listarPorUsuario(Integer usuarioId);

    void eliminarReseña(Integer id);
}
