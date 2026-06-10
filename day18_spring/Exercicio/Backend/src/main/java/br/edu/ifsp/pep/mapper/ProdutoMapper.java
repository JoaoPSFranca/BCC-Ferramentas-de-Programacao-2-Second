package br.edu.ifsp.pep.mapper;

import br.edu.ifsp.pep.dto.ProdutoDTO;
import br.edu.ifsp.pep.model.Produto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel="spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProdutoMapper {
    ProdutoMapper INSTANCE = Mappers.getMapper(ProdutoMapper.class);

    Produto toProduto(ProdutoDTO produtoDTO);
    ProdutoDTO toProdutoDTO(Produto produto);

    List<ProdutoDTO> toProdutoDTOList(List<Produto> produtos);
}
