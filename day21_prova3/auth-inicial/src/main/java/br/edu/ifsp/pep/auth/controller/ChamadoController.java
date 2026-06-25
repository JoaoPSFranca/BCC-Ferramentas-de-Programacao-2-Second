package br.edu.ifsp.pep.auth.controller;

import br.edu.ifsp.pep.auth.domain.chamado.*;
import br.edu.ifsp.pep.auth.service.ChamadoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chamados")
public class ChamadoController {
    @Autowired
    private ChamadoService chamadoService;

    public ResponseChamadoDTO chamadoToChamadoDTO(Chamado chamado) {
        return new ResponseChamadoDTO(
                chamado.getTitulo(),
                chamado.getDataAbertura(),
                chamado.getStatus(),
                chamado.getPrioridade()
        );
    }

    @PostMapping("")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<ResponseChamadoDTO> abrirChamado(@RequestBody @Valid RegisterChamadoDTO rChamadoDTO) {
        Chamado chamado = this.chamadoService.abrirChamado(rChamadoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(chamadoToChamadoDTO(chamado));
    }

    @GetMapping("")
    public ResponseEntity<List<ResponseChamadoDTO>> getChamados(){
        List<ResponseChamadoDTO> chamados = this.chamadoService.getChamados()
                .stream()
                .map(chamado -> chamadoToChamadoDTO(chamado))
                .toList();

        return ResponseEntity.ok(chamados);
    }

    @GetMapping("/prioridade/{prioridade}")
    public ResponseEntity<List<ResponseChamadoDTO>> getChamadosByPrioridade(@PathVariable Prioridade prioridade){
        List<ResponseChamadoDTO> chamados = this.chamadoService.getChamadosByPrioridade(prioridade)
                .stream()
                .map(chamado -> chamadoToChamadoDTO(chamado))
                .toList();

        return ResponseEntity.ok(chamados);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ResponseChamadoDTO> updateStatus(
            @PathVariable Long id,
            @RequestBody @Valid UpdateStatusDTO uChamadoDTO
    ) {
        Chamado chamado = this.chamadoService.alterarStatus(uChamadoDTO, id);
        return ResponseEntity.ok(chamadoToChamadoDTO(chamado));
    }

    @DeleteMapping("/{id}")
    public HttpStatus deleteStatus(@PathVariable Long id){
        this.chamadoService.delete(id);
        return HttpStatus.OK;
    }
}
