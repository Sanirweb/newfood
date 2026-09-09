package com.fooddelivery.order.service;

import com.fooddelivery.menu.service.MenuService;
import com.fooddelivery.order.entity.Order;
import com.fooddelivery.order.entity.OrderItem;
import com.fooddelivery.order.repository.OrderRepository;
import com.fooddelivery.shared.OrderStatus;
import com.fooddelivery.shared.ResourceNotFoundException;
import com.fooddelivery.shared.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MenuService menuService;

    public Order createOrder(Order order) {
        // Validate all menu items exist before creating order
        for (OrderItem item : order.getOrderItems()) {
            if (!menuService.validateItemExists(item.getMenuItemId())) {
                throw new ValidationException("Menu item not found with id: " + item.getMenuItemId());
            }
            
            // Calculate total for this item
            double itemTotal = item.getUnitPrice() * item.getQuantity();
            item.setTotalPrice(itemTotal);
            item.setOrder(order);
        }

        // Calculate total amount
        double totalAmount = order.getOrderItems().stream()
                .mapToDouble(OrderItem::getTotalPrice)
                .sum();
        
        order.setTotalAmount(totalAmount);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    public Order getOrderById(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isEmpty()) {
            throw new ResourceNotFoundException("Order not found with id: " + id);
        }
        return order.get();
    }

    public Order updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order existingOrder = getOrderById(orderId);
        
        // Validate status transition
        validateStatusTransition(existingOrder.getStatus(), newStatus);
        
        existingOrder.setStatus(newStatus);
        existingOrder.setUpdatedAt(LocalDateTime.now());
        
        if (newStatus == OrderStatus.COMPLETED || newStatus == OrderStatus.CANCELLED) {
            existingOrder.setCompletedAt(LocalDateTime.now());
        }
        
        return orderRepository.save(existingOrder);
    }

    private void validateStatusTransition(OrderStatus current, OrderStatus next) {
        switch (current) {
            case PENDING:
                if (next != OrderStatus.CONFIRMED && next != OrderStatus.CANCELLED) {
                    throw new ValidationException("Cannot transition from PENDING to " + next);
                }
                break;
            case CONFIRMED:
                if (next != OrderStatus.DELIVERING && next != OrderStatus.CANCELLED) {
                    throw new ValidationException("Cannot transition from CONFIRMED to " + next);
                }
                break;
            case DELIVERING:
                if (next != OrderStatus.COMPLETED && next != OrderStatus.CANCELLED) {
                    throw new ValidationException("Cannot transition from DELIVERING to " + next);
                }
                break;
            case COMPLETED:
            case CANCELLED:
                throw new ValidationException("Cannot change status of COMPLETED or CANCELLED order");
            default:
                throw new ValidationException("Invalid current status: " + current);
        }
    }
}
