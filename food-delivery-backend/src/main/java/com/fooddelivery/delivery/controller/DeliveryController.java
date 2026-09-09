package com.fooddelivery.delivery.controller;

import com.fooddelivery.delivery.entity.Delivery;
import com.fooddelivery.delivery.service.DeliveryService;
import com.fooddelivery.shared.DeliveryStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @PostMapping("/deliveries")
    public ResponseEntity<Delivery> assignDriver(@RequestBody Delivery delivery) {
        Delivery assignedDelivery = deliveryService.assignDriver(delivery);
        return new ResponseEntity<>(assignedDelivery, HttpStatus.CREATED);
    }

    @GetMapping("/deliveries/order/{orderId}")
    public ResponseEntity<List<Delivery>> getDeliveriesByOrderId(@PathVariable Long orderId) {
        List<Delivery> deliveries = deliveryService.getDeliveriesByOrderId(orderId);
        return new ResponseEntity<>(deliveries, HttpStatus.OK);
    }

    @PutMapping("/deliveries/{id}/status")
    public ResponseEntity<Delivery> updateDeliveryStatus(@PathVariable Long id, @RequestParam DeliveryStatus status) {
        Delivery updatedDelivery = deliveryService.updateDeliveryStatus(id, status);
        return new ResponseEntity<>(updatedDelivery, HttpStatus.OK);
    }
}
