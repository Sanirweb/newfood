package com.fooddelivery.delivery.repository;

import com.fooddelivery.delivery.entity.Delivery;
import com.fooddelivery.shared.DeliveryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findByOrderId(Long orderId);
    Optional<Delivery> findByOrderIdAndStatusNot(Long orderId, DeliveryStatus status);
}
