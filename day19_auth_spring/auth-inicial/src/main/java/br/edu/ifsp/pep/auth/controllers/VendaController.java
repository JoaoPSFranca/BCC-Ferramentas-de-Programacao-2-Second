package br.edu.ifsp.pep.auth.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("vendas")
public class VendaController {

    @PostMapping
    public String adicionar() {
        return new String("Venda adicionada.");
    }

    @GetMapping()
    public String obterTodas() {
        return new String("Retornando Vendas");
    }

    
}
