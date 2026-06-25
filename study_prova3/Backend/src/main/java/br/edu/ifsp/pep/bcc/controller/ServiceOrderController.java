package br.edu.ifsp.pep.bcc.controller;

import br.edu.ifsp.pep.bcc.domain.service.dto.ServiceDTO;
import br.edu.ifsp.pep.bcc.domain.service.model.ServiceModel;
import br.edu.ifsp.pep.bcc.domain.serviceOrder.dto.RegisterServiceOrderDTO;
import br.edu.ifsp.pep.bcc.domain.serviceOrder.dto.ServiceOrderDTO;
import br.edu.ifsp.pep.bcc.domain.serviceOrder.dto.UpdateStatusDTO;
import br.edu.ifsp.pep.bcc.domain.serviceOrder.model.ServiceOrder;
import br.edu.ifsp.pep.bcc.domain.serviceOrderItem.dto.ServiceOrderItemDTO;
import br.edu.ifsp.pep.bcc.domain.serviceOrderItem.model.ServiceOrderItem;
import br.edu.ifsp.pep.bcc.repository.ServiceOrderRepository;
import br.edu.ifsp.pep.bcc.service.ServiceOrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("service")
public class ServiceOrderController {

    @Autowired
    private ServiceOrderRepository serviceOrderRepository;

    @Autowired
    private ServiceOrderService serviceOrderService;

    public ServiceOrderDTO serviceOrderToServiceOrderDTO(ServiceOrder serviceOrder) {
        return new ServiceOrderDTO(
                serviceOrder.getId(),
                serviceOrder.getVehiclePlate(),
                serviceOrder.getOpeningDate(),
                serviceOrder.getStatus(),
                serviceOrder.getTotalValue(),
                serviceOrder.getUser().getLogin(),
                serviceOrder.getItems().stream()
                        .map(item -> new ServiceOrderItemDTO(
                                item.getQuantityHours(),
                                item.getSubtotal(),
                                new ServiceDTO(
                                        item.getServiceModel().getId(),
                                        item.getServiceModel().getDescription(),
                                        item.getServiceModel().getBasePrice()
                                )
                        )).toList()
        );
    }

    @GetMapping("")
    public ResponseEntity<List<ServiceOrderDTO>> getAll() {
        List<ServiceOrderDTO> serviceOrders = serviceOrderRepository.findAll()
                .stream()
                .map(this::serviceOrderToServiceOrderDTO).toList();

        return ResponseEntity.ok(serviceOrders);
    }

    @PostMapping("")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<ServiceOrderDTO> create(@RequestBody @Valid RegisterServiceOrderDTO registerServiceOrderDTO) {
        ServiceOrder newSo = new ServiceOrder();

        newSo.setVehiclePlate(registerServiceOrderDTO.vehiclePlate());
        newSo.setOpeningDate(registerServiceOrderDTO.openingDate());

        newSo.setItems(registerServiceOrderDTO.items().stream()
                .map(item -> new ServiceOrderItem(
                        item.quantityHours(),
                        new ServiceModel(item.serviceId()))
                ).toList()
        );

        newSo = serviceOrderService.openNewSO(newSo);

        ServiceOrderDTO serviceOrderDTO = serviceOrderToServiceOrderDTO(newSo);

        return ResponseEntity.status(HttpStatus.CREATED).body(serviceOrderDTO);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ServiceOrderDTO> updateStatus(
            @PathVariable Long id,
            @RequestBody @Valid UpdateStatusDTO dto) {

        ServiceOrder os = serviceOrderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "OS não encontrada"));

        os.setStatus(dto.status());

        serviceOrderRepository.save(os);

        return ResponseEntity.ok(serviceOrderToServiceOrderDTO(os));
    }
}