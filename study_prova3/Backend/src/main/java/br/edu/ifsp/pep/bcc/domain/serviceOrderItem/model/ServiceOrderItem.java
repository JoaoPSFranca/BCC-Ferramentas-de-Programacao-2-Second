package br.edu.ifsp.pep.bcc.domain.serviceOrderItem.model;

import br.edu.ifsp.pep.bcc.domain.service.model.ServiceModel;
import br.edu.ifsp.pep.bcc.domain.serviceOrder.model.ServiceOrder;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="item_ordem_servico")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ServiceOrderItem {
    @Id
    @Column(name="item_id")
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="item_quantidade_horas")
    private int quantityHours;

    @Column(name="item_subtotal")
    private BigDecimal subtotal;

    @ManyToOne
    @JoinColumn(name="ser_id")
    private ServiceModel serviceModel;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "os_id")
    private ServiceOrder serviceOrder;

    public ServiceOrderItem(int quantityHours, BigDecimal subtotal, ServiceModel serviceModel, ServiceOrder serviceOrder) {
        this.quantityHours = quantityHours;
        this.subtotal = subtotal;
        this.serviceModel = serviceModel;
        this.serviceOrder = serviceOrder;
    }

    public ServiceOrderItem(int quantityHours, ServiceModel serviceModel) {
        this.quantityHours = quantityHours;
        this.serviceModel = serviceModel;
    }
}
