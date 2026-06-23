package br.edu.ifsp.pep.bcc.repository;

import br.edu.ifsp.pep.bcc.domain.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, String> {
    public UserDetails findByLogin(String login);
}
