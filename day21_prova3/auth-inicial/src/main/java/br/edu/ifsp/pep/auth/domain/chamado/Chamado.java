package br.edu.ifsp.pep.auth.domain.chamado;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="chamado")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Chamado {
    @Id
    @Column(name="ch_id")
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="ch_titulo")
    private String titulo;

    @Column(name="ch_data_abertura")
    private LocalDate dataAbertura;

    @Column(name="ch_status")
    private Status status;

    @Column(name="ch_prioridade")
    private Prioridade prioridade;

    public Chamado(String titulo, LocalDate dataAbertura, Prioridade prioridade) {
        this.titulo = titulo;
        this.dataAbertura = dataAbertura;
        this.prioridade = prioridade;
        this.status = Status.ABERTO;
    }
}
