package br.edu.ifsp.pep.bcc.domain.serviceOrder.dto;

import br.edu.ifsp.pep.bcc.domain.serviceOrder.model.Status;
import jakarta.validation.constraints.NotNull;

public record UpdateStatusDTO (
        @NotNull
        Status status
) { }
