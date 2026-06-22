package br.edu.ifsp.pep.BCC.controller;

import br.edu.ifsp.pep.BCC.domain.user.AuthenticationDTO;
import br.edu.ifsp.pep.BCC.domain.user.LoginResponseDTO;
import br.edu.ifsp.pep.BCC.domain.user.RegisterDTO;
import br.edu.ifsp.pep.BCC.domain.user.User;
import br.edu.ifsp.pep.BCC.repository.UserRepository;
import br.edu.ifsp.pep.BCC.service.TokenService;
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

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        System.out.println("login");
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        System.out.println(usernamePassword);
        var auth = this.authenticationManager.authenticate(usernamePassword);
        System.out.println(auth);

        if (auth.getPrincipal() != null) {
            var token = this.tokenService.generateToken((User) auth.getPrincipal());
            System.out.println(token);
            return ResponseEntity.ok(new LoginResponseDTO(token));
        }

        return ResponseEntity.notFound().build();
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
