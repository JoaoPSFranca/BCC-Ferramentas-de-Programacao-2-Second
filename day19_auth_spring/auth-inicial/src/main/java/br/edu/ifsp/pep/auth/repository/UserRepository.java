package br.edu.ifsp.pep.auth.repository;

import br.edu.ifsp.pep.auth.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, String> {
    public UserDetails findByLogin(String login);
    public UserDetails findByLoginAndPassword(String login, String password);
}
