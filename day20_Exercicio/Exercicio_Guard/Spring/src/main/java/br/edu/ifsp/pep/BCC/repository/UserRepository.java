package br.edu.ifsp.pep.BCC.repository;

import br.edu.ifsp.pep.BCC.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, String> {
    public UserDetails findByLogin(String login);
    public UserDetails findByLoginAndPassword(String login, String password);
}
