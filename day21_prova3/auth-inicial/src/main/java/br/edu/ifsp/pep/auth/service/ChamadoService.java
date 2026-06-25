package br.edu.ifsp.pep.auth.service;

import br.edu.ifsp.pep.auth.domain.chamado.*;
import br.edu.ifsp.pep.auth.domain.user.User;
import br.edu.ifsp.pep.auth.domain.user.UserRole;
import br.edu.ifsp.pep.auth.repository.ChamadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ChamadoService {
    @Autowired
    private ChamadoRepository chamadoRepository;

    public Chamado abrirChamado(RegisterChamadoDTO chamadoDTO) {
        Chamado novoChamado = new Chamado(chamadoDTO.titulo(), chamadoDTO.dataAbertura(), chamadoDTO.prioridade());
        chamadoRepository.save(novoChamado);
        return novoChamado;
    }

    public List<Chamado> getChamados() {
        User usuario = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        assert usuario != null;
        if (usuario.getRole() == UserRole.USER)
            return chamadoRepository.getByStatus(Status.ABERTO);
        else
            return chamadoRepository.findAll();
    }

    public List<Chamado> getChamadosByPrioridade(Prioridade prioridade) {
        User usuario = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        assert usuario != null;
        if (usuario.getRole() == UserRole.USER)
            return chamadoRepository.getByPrioridadeAndStatus(Prioridade.BAIXA, Status.ABERTO);
        else
            return chamadoRepository.getByPrioridade(prioridade);
    }

    public Chamado alterarStatus(UpdateStatusDTO statusDTO, Long id) {
        User usuario = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        assert usuario != null;
        Chamado chamado = chamadoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chamado não encontrado"));

        switch (chamado.getStatus()) {
            case ABERTO, AGUARDANDO_CLIENTE -> {
                if (statusDTO.status() != Status.EM_ANDAMENTO)
                    throw new ResponseStatusException(HttpStatus.NOT_MODIFIED, "Mudança de Status inválida");
            }
            case EM_ANDAMENTO -> {
                if (statusDTO.status() != Status.AGUARDANDO_CLIENTE && statusDTO.status() != Status.FINALIZADO)
                    throw new ResponseStatusException(HttpStatus.NOT_MODIFIED, "Mudança de Status inválida");
            }
            case FINALIZADO ->  {
                if (usuario.getRole() != UserRole.ADMIN)
                    throw new ResponseStatusException(HttpStatus.NOT_MODIFIED, "Falta de permissão");
                if (statusDTO.status() != Status.REABERTO)
                    throw new ResponseStatusException(HttpStatus.NOT_MODIFIED, "Mudança de Status inválida");
            }
            case REABERTO -> {
                if (statusDTO.status() != Status.EM_ANDAMENTO && statusDTO.status() != Status.FINALIZADO)
                    throw new ResponseStatusException(HttpStatus.NOT_MODIFIED, "Mudança de Status inválida");
            }
        }

        chamado.setStatus(statusDTO.status());
        return chamadoRepository.save(chamado);
    }

    public void delete(Long id) {
        chamadoRepository.deleteById(id);
    }
}
