package br.edu.ifsp.pep.bcc.repository;

import br.edu.ifsp.pep.bcc.domain.serviceOrder.model.ServiceOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceOrderRepository extends JpaRepository<ServiceOrder, Long> {
}
