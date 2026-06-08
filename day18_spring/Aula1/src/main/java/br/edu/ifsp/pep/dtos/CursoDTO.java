package br.edu.ifsp.pep.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CursoDTO (
    @NotBlank
    @Size
    String nome
) {}