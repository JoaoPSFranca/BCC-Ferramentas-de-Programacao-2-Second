package br.edu.ifsp.pep.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name="produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long codigo;

    @Column(name="descricao")
    private String descricao;

    @Column(name="preco")
    private BigDecimal preco;

    @Column(name="quantidade")
    private int quantidade;

    @Enumerated(EnumType.ORDINAL)
    private Status status;

}
