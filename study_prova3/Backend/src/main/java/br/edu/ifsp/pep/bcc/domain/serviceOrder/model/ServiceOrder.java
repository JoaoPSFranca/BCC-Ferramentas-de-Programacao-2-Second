package br.edu.ifsp.pep.bcc.domain.serviceOrder.model;

import br.edu.ifsp.pep.bcc.domain.serviceOrderItem.model.ServiceOrderItem;
import br.edu.ifsp.pep.bcc.domain.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="ordem_servico")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ServiceOrder {
    @Id
    @Column(name="os_id")
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="os_placaVeiculo")
    private String vehiclePlate;

    @Column(name="os_dataAbertura")
    private LocalDateTime openingDate;

    @Column(name="os_status")
    private Status status;

    @Column(name="os_valorTotal")
    private BigDecimal totalValue;

    @ManyToOne
    @JoinColumn(name = "us_id")
    private User user;

    @OneToMany(mappedBy = "serviceOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceOrderItem> items;

    public ServiceOrder(String vehiclePlate, LocalDateTime openingDate, Status status, BigDecimal totalValue, User user) {
        this.vehiclePlate = vehiclePlate;
        this.openingDate = openingDate;
        this.status = status;
        this.totalValue = totalValue;
        this.user = user;
    }
}
