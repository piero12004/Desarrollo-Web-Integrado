package com.utp.compre.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.utp.compre.model.Reseña;
import com.utp.compre.model.Usuario;

@Repository
public interface ReseñaRepository extends JpaRepository<Reseña, Integer>{
    
    List<Reseña> findByUsuario(Usuario usuario);

    List<Reseña> findByProductoApiId(String productoApiId);
}
