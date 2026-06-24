package br.edu.ifsp.pep.bcc.domain.serviceOrderItem.dto;

import br.edu.ifsp.pep.bcc.domain.service.dto.ServiceDTO;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ServiceOrderItemDTO(
        @Min(1)
        int quantityHours,

        @NotNull
        BigDecimal subtotal,

        @NotNull
        ServiceDTO service
) { }
