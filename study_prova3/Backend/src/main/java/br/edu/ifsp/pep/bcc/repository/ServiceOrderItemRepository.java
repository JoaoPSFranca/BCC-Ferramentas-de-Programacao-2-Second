package br.edu.ifsp.pep.bcc.repository;

import br.edu.ifsp.pep.bcc.domain.serviceOrderItem.model.ServiceOrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceOrderItemRepository extends JpaRepository<ServiceOrderItem, Long> { }
