package br.edu.ifsp.pep.bcc.controller;

import br.edu.ifsp.pep.bcc.domain.service.dto.ServiceDTO;
import br.edu.ifsp.pep.bcc.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("services")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping("")
    public ResponseEntity<List<ServiceDTO>> getAll() {
        List<ServiceDTO> services = serviceRepository.findAll()
                .stream()
                .map(service -> new ServiceDTO(service.getId(), service.getDescription(), service.getBasePrice()))
                .toList();
        return ResponseEntity.ok(services);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        if (!serviceRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        serviceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
