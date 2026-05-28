package br.edu.ifsp.pep.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsp.pep.model.Curso;
import br.edu.ifsp.pep.repository.CursoRepository;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/cursos")
public class CursoController {
    
    private CursoRepository cursoRepository;

    public CursoController(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @GetMapping
    public List<Curso> getAll() {
        return cursoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> getOne(@PathVariable("id") Long identifier) {
        return cursoRepository.findById(identifier)
        .map(curso -> ResponseEntity.ok().body(curso))
        .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/busca")
    public List<Curso> teste(@RequestParam("nome") String valor) {
        return cursoRepository.findByNomeContainingIgnoreCase(valor);
    } 

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public Curso inserir(@RequestBody Curso curso) {
        return cursoRepository.save(curso);
    }
    
    
}
