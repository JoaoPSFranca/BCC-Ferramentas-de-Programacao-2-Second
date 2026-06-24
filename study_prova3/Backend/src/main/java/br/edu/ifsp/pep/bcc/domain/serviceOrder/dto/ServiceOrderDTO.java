package br.edu.ifsp.pep.bcc.domain.serviceOrder.dto;

import br.edu.ifsp.pep.bcc.domain.serviceOrder.model.Status;
import br.edu.ifsp.pep.bcc.domain.serviceOrderItem.dto.ServiceOrderItemDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record ServiceOrderDTO(
    @NotBlank
    String vehiclePlate,

    @NotNull
    LocalDate openingDate,

    @NotNull
    Status status,

    @NotNull
    BigDecimal totalValue,

    @NotBlank
    String userId,

    @NotNull
    @NotEmpty
    List<ServiceOrderItemDTO> items
) { }
