package br.edu.ifsp.pep.bcc.domain.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record ServiceDTO (
        @PositiveOrZero
        Long id,

        @NotBlank
        String description,

        @NotNull
        BigDecimal basePrice
) { }
