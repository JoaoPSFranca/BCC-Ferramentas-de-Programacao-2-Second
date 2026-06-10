package br.edu.ifsp.pep.controller;

import br.edu.ifsp.pep.dto.ProdutoDTO;
import br.edu.ifsp.pep.mapper.ProdutoMapper;
import br.edu.ifsp.pep.model.Produto;
import br.edu.ifsp.pep.repository.ProdutoRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("produto")
public class ProdutoController {
    private ProdutoRepository produtoRepository;
    private ProdutoMapper mapper;

    @GetMapping("/")
    public ResponseEntity<List<ProdutoDTO>> getAll() {
        List <Produto> produtos = produtoRepository.findAll();

        if (produtos.isEmpty())
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(mapper.toProdutoDTOList(produtos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> getOne(@PathVariable Long id) {
        return produtoRepository.findById(id)
                .map(curso -> ResponseEntity.ok().body(curso))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<ProdutoDTO> create(@RequestBody @Valid ProdutoDTO produtoDTO) {
        Produto produto = produtoRepository.save(mapper.toProduto(produtoDTO));

        return ResponseEntity.ok().body(mapper.toProdutoDTO(produto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProdutoDTO> delete(@PathVariable long id) {
        Optional<Produto> produto = produtoRepository.findById(id);

        if (produto.isPresent()) {
            Produto p = produto.get();
            produtoRepository.delete(p);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}
