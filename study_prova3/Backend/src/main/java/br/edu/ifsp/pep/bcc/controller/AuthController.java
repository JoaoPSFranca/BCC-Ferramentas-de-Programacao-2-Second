package br.edu.ifsp.pep.bcc.controller;

import br.edu.ifsp.pep.bcc.domain.user.dto.AuthDTO;
import br.edu.ifsp.pep.bcc.domain.user.dto.LoginResponseDTO;
import br.edu.ifsp.pep.bcc.domain.user.dto.RegisterDTO;
import br.edu.ifsp.pep.bcc.domain.user.model.User;
import br.edu.ifsp.pep.bcc.repository.UserRepository;
import br.edu.ifsp.pep.bcc.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        if (auth.getPrincipal() == null || !(auth.getPrincipal() instanceof User)) {
            return ResponseEntity.status(401).build();
        }

        var token = this.tokenService.generateToken((User) auth.getPrincipal());

        if (token == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        System.out.println("Register");
        System.out.println(data.login());
        if (this.userRepository.findByLogin(data.login()) != null) {
            return ResponseEntity.badRequest().build();
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User user = new User(data.login(), encryptedPassword, data.role());

        this.userRepository.save(user);

        return ResponseEntity.ok(user);
    }

}