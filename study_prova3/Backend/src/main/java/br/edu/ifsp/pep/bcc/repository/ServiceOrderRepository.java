package br.edu.ifsp.pep.bcc.repository;

import br.edu.ifsp.pep.bcc.domain.serviceOrder.model.ServiceOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface ServiceOrderRepository extends JpaRepository<ServiceOrder, Long> {
    public ServiceOrder findByVehiclePlateAndOpeningDate(String vehiclePlate, LocalDate openingDate);
}
