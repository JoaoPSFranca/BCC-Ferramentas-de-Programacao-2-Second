package br.edu.ifsp.pep.auth.domain.user;

public record RegisterDTO(String login, String password, UserRole role) {

}
