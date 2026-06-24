package br.edu.ifsp.pep.bcc.domain.serviceOrderItem.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PositiveOrZero;

public record RegisterServiceOrderItemDTO(
        @Min(1)
        int quantityHours,

        @PositiveOrZero
        Long serviceId
) { }
