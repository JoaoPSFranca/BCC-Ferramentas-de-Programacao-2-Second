package br.edu.ifsp.pep.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration // Informa que é uma classe de configuração
@EnableWebSecurity // Informa que esta classe possui a configuração de segurança
public class SecurityConfiguration {

    @Autowired
    private SecurityFilter securityFilter;

    // Permite o Spring instanciar e gerenciar o objeto retornado, permitindo que
    // seja injetado automaticamente em outras partes da aplicação.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) {
        System.out.println("security filter chain");
        return httpSecurity
                .csrf(csrf -> csrf.disable()) // desabilita csrf
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        authorize -> authorize
                                .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                                .requestMatchers(HttpMethod.POST, "/auth/register").permitAll() // Somente para testar
                                .requestMatchers(HttpMethod.POST, "/vendas").hasRole("ADMIN")

                                .requestMatchers(HttpMethod.POST, "/api/chamados").hasAnyRole("ADMIN", "USER")
                                .requestMatchers(HttpMethod.GET, "/api/chamados").hasAnyRole("ADMIN", "USER")
                                .requestMatchers(HttpMethod.GET, "/api/chamados/prioridade/{prioridade}").hasAnyRole("ADMIN", "USER")
                                .requestMatchers(HttpMethod.PATCH, "/api/chamados{id}/status").hasAnyRole("ADMIN", "USER")
                                .requestMatchers(HttpMethod.DELETE, "/api/chamados/{id}").hasRole("ADMIN")

                                .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
