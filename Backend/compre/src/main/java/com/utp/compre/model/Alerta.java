package com.utp.compre.model;

import javax.swing.text.StyledEditorKit.BoldAction;

import org.hibernate.annotations.DialectOverride.GeneratedColumn;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "alerta")
public class Alerta {
    
    @Id
    @GeneratedColumn(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "prodApi_ id")
    private String prodApi_id;

    @Column(name = "precio_obj")
    private Double precioObj;

    private Boolean activo = true;
}
