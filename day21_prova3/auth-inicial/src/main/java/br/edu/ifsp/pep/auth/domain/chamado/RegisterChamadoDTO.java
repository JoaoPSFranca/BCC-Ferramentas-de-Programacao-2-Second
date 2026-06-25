package br.edu.ifsp.pep.auth.domain.chamado;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record RegisterChamadoDTO (
    @NotBlank
    String titulo,

    @NotNull
    LocalDate dataAbertura,

    @NotNull
    Prioridade prioridade
) { }
