package com.utp.compre.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "resena")
public class Resena {
    
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY) 
   private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "producto_api_id")
    private String productoApiId;

    private String comentario;

    private Integer puntuacion;

    private LocalDateTime fecha = LocalDateTime.now();
}
