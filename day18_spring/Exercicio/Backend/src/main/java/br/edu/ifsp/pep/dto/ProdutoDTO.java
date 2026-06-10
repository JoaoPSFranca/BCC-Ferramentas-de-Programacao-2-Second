package br.edu.ifsp.pep.dto;

import br.edu.ifsp.pep.model.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProdutoDTO (
        @NotNull
        @NotBlank
        @Size(min = 2, max = 100)
        String descricao,

        @NotNull
        @NotBlank
        double preco,

        @NotNull
        @NotBlank
        @PositiveOrZero
        int quantidade,

        @NotNull
        @NotBlank
        Status status
) {}
