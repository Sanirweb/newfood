package com.fooddelivery.delivery.entity;

import com.fooddelivery.shared.DeliveryStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long orderId;

    @Column(nullable = false)
    private String driverName;

    @Column(nullable = false)
    private String driverPhone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryStatus status = DeliveryStatus.ASSIGNED;

    @Column(nullable = false)
    private String deliveryAddress;

    @Column(nullable = false)
    private LocalDateTime assignedAt = LocalDateTime.now();

    private LocalDateTime pickedUpAt;
    private LocalDateTime deliveredAt;
    private LocalDateTime updatedAt;
}
