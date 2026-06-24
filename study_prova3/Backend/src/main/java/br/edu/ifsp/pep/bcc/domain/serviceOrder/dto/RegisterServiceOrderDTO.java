package br.edu.ifsp.pep.bcc.domain.serviceOrder.dto;

import br.edu.ifsp.pep.bcc.domain.serviceOrderItem.dto.RegisterServiceOrderItemDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record RegisterServiceOrderDTO(
        @NotBlank
        String vehiclePlate,

        @NotNull
        LocalDate openingDate,

        @NotNull
        @NotEmpty
        List<RegisterServiceOrderItemDTO> items
) { }
