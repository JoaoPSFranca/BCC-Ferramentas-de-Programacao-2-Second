package br.edu.ifsp.pep.auth.domain.chamado;

import jakarta.validation.constraints.NotNull;

public record UpdateStatusDTO (
    @NotNull
    Status status
) { }
