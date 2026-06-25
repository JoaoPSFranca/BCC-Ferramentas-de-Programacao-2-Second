package br.edu.ifsp.pep.auth.repository;

import br.edu.ifsp.pep.auth.domain.chamado.Chamado;
import br.edu.ifsp.pep.auth.domain.chamado.Prioridade;
import br.edu.ifsp.pep.auth.domain.chamado.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChamadoRepository extends JpaRepository<Chamado, Long> {

    public List<Chamado> getByStatus(Status status);

    public List<Chamado> getByPrioridadeAndStatus(Prioridade prioridade, Status status);

    public List<Chamado> getByPrioridade(Prioridade prioridade);
}
