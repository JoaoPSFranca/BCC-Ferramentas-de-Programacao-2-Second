package br.edu.ifsp.pep.dto;

import br.edu.ifsp.pep.model.Status;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public record ProdutoDTO (
        @NotBlank
        String descricao,

        @NotBlank
        BigDecimal preco,

        @NotBlank
        int quantidade,

        @NotBlank
        Status status
) {}
