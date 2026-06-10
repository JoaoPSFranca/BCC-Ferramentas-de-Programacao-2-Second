package br.edu.ifsp.pep.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Data
@Entity
@Table(name="produto")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Produto {
    @Id
    @Column(name="codigo")
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long codigo;

    @Column(name="descricao", nullable = false)
    @Size(min = 2, max = 100)
    @NotBlank(message="Descricao can't be empty. ")
    private String descricao;

    @Column(name="preco", nullable = false)
    @NotBlank(message="Preco can't be empty. ")
    private double preco;

    @Column(name="quantidade", nullable = false)
    @NotBlank(message="Quantidade can't be empty. ")
    @PositiveOrZero(message="Quantidade can't be negative. ")
    private int quantidade;

    @Enumerated(EnumType.STRING)
    @Column(name="status", nullable = false)
    @ElementCollection(targetClass = Status.class, fetch = FetchType.EAGER)
    @JoinTable(
            name="status",
            joinColumns = {
                    @JoinColumn(name="codigo")
            }
    )
    private Status status;

}
