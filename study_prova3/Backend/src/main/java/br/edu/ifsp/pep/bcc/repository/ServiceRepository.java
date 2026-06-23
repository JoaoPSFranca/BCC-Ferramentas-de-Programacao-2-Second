package br.edu.ifsp.pep.bcc.repository;

import br.edu.ifsp.pep.bcc.domain.service.model.ServiceModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {
}
