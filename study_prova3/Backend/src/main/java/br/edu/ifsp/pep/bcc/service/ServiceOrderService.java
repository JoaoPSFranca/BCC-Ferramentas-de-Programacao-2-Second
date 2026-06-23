package br.edu.ifsp.pep.bcc.service;

import br.edu.ifsp.pep.bcc.domain.service.model.ServiceModel;
import br.edu.ifsp.pep.bcc.domain.serviceOrder.model.ServiceOrder;
import br.edu.ifsp.pep.bcc.domain.serviceOrder.model.Status;
import br.edu.ifsp.pep.bcc.domain.serviceOrderItem.model.ServiceOrderItem;
import br.edu.ifsp.pep.bcc.domain.user.model.User;
import br.edu.ifsp.pep.bcc.repository.ServiceOrderItemRepository;
import br.edu.ifsp.pep.bcc.repository.ServiceOrderRepository;
import br.edu.ifsp.pep.bcc.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ServiceOrderService {
    @Autowired
    private ServiceOrderRepository serviceOrderRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private ServiceOrderItemRepository serviceOrderItemRepository;

    public void openNewSO(ServiceOrder newSo) {
        User capturedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (capturedUser != null) {
            newSo.setUser(capturedUser);

            Double total = 0.0;

            for (ServiceOrderItem item : newSo.getItems()) {
                ServiceModel serviceModel = serviceRepository.getReferenceById(item.getServiceModel().getId());
                item.setSubtotal(serviceModel.getBasePrice().multiply(BigDecimal.valueOf(item.getQuantityHours())));
                total += item.getSubtotal().doubleValue();
            }

            newSo.setTotalValue(BigDecimal.valueOf(total));
            newSo.setStatus(Status.OPEN);
            serviceOrderRepository.save(newSo);

            for (ServiceOrderItem item : newSo.getItems())
                item.setServiceOrder(newSo);

            this.serviceOrderItemRepository.saveAll(newSo.getItems());
        } else {
            throw new RuntimeException("User not authenticated");
        }
    }
}