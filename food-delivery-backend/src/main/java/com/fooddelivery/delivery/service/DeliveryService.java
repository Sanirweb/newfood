package com.fooddelivery.delivery.service;

import com.fooddelivery.delivery.entity.Delivery;
import com.fooddelivery.delivery.repository.DeliveryRepository;
import com.fooddelivery.order.service.OrderService;
import com.fooddelivery.shared.DeliveryStatus;
import com.fooddelivery.shared.OrderStatus;
import com.fooddelivery.shared.ResourceNotFoundException;
import com.fooddelivery.shared.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private OrderService orderService;

    public Delivery assignDriver(Delivery delivery) {
        // Validate that order exists by trying to retrieve it
        orderService.getOrderById(delivery.getOrderId());
        
        // Check if there's already an active delivery for this order
        Optional<Delivery> existingDelivery = deliveryRepository.findByOrderIdAndStatusNot(
            delivery.getOrderId(), 
            DeliveryStatus.DELIVERED
        );
        
        if (existingDelivery.isPresent()) {
            throw new ValidationException("There is already an active delivery for order: " + delivery.getOrderId());
        }
        
        delivery.setStatus(DeliveryStatus.ASSIGNED);
        delivery.setAssignedAt(LocalDateTime.now());
        
        return deliveryRepository.save(delivery);
    }

    public List<Delivery> getDeliveriesByOrderId(Long orderId) {
        return deliveryRepository.findByOrderId(orderId);
    }

    public Delivery getDeliveryById(Long id) {
        Optional<Delivery> delivery = deliveryRepository.findById(id);
        if (delivery.isEmpty()) {
            throw new ResourceNotFoundException("Delivery not found with id: " + id);
        }
        return delivery.get();
    }

    public Delivery updateDeliveryStatus(Long deliveryId, DeliveryStatus newStatus) {
        Delivery existingDelivery = getDeliveryById(deliveryId);
        
        // Validate status transition
        validateStatusTransition(existingDelivery.getStatus(), newStatus);
        
        existingDelivery.setStatus(newStatus);
        existingDelivery.setUpdatedAt(LocalDateTime.now());
        
        switch (newStatus) {
            case PICKED_UP:
                existingDelivery.setPickedUpAt(LocalDateTime.now());
                break;
            case DELIVERED:
                existingDelivery.setDeliveredAt(LocalDateTime.now());
                
                // Also update the corresponding order status to COMPLETED
                try {
                    orderService.updateOrderStatus(existingDelivery.getOrderId(), OrderStatus.COMPLETED);
                } catch (Exception e) {
                    // Log the error but don't fail the delivery update
                    System.err.println("Failed to update order status: " + e.getMessage());
                }
                break;
        }
        
        return deliveryRepository.save(existingDelivery);
    }

    private void validateStatusTransition(DeliveryStatus current, DeliveryStatus next) {
        switch (current) {
            case ASSIGNED:
                if (next != DeliveryStatus.PICKED_UP && next != DeliveryStatus.DELIVERED) {
                    throw new ValidationException("Cannot transition from ASSIGNED to " + next);
                }
                break;
            case PICKED_UP:
                if (next != DeliveryStatus.DELIVERED) {
                    throw new ValidationException("Cannot transition from PICKED_UP to " + next);
                }
                break;
            case DELIVERED:
                throw new ValidationException("Cannot change status of DELIVERED delivery");
            default:
                throw new ValidationException("Invalid current status: " + current);
        }
    }
}
