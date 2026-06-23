package br.edu.ifsp.pep.bcc.domain.service.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="servico")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ServiceModel {
    @Id
    @Column(name="ser_id")
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name="ser_descricao")
    private String description;

    @DecimalMin(value = "10.00")
    @Column(name="ser_precoBase")
    private BigDecimal basePrice;

    public ServiceModel(String description, BigDecimal basePrice) {
        this.description = description;
        this.basePrice = basePrice;
    }
}
