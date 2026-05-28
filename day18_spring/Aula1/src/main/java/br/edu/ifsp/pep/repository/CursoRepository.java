package br.edu.ifsp.pep.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifsp.pep.model.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findByNomeContainingIgnoreCase(String nome);
}
