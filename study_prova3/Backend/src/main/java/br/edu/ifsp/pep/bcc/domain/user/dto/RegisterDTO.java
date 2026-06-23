package br.edu.ifsp.pep.bcc.domain.user.dto;

import br.edu.ifsp.pep.bcc.domain.user.model.UserRole;

public record RegisterDTO (String login, String password, UserRole role) {
}
