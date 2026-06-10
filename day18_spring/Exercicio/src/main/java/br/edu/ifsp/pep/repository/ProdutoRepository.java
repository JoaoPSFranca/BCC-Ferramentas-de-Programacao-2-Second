package br.edu.ifsp.pep.repository;

import br.edu.ifsp.pep.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
