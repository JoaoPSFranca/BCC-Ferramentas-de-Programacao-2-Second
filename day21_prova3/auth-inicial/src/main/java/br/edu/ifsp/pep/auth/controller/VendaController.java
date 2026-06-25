package br.edu.ifsp.pep.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("vendas")
public class VendaController {

    //ADMIN
    @PostMapping
    public String adicionar() {
        return new String("Venda adicionada.");
    }

    //ADMIN ou USER
    @GetMapping()
    public String obterTodas() {
        return new String("Retornando Vendas");
    }

}
