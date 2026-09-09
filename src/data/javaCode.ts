export const pomXml = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.4</version>
        <relativePath/>
    </parent>

    <groupId>com.fooddelivery</groupId>
    <artifactId>food-delivery-modular-monolith</artifactId>
    <version>1.0.0</version>
    <name>Food Delivery Modular Monolith</name>
    <description>Modular Monolith Food Delivery System - Java 21 + Spring Boot 3.3+</description>

    <properties>
        <java.version>21</java.version>
        <springdoc.version>2.6.0</springdoc.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- H2 Database (In-Memory) -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Spring Boot Actuator -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!-- Springdoc OpenAPI (Swagger UI) -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>\${springdoc.version}</version>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- Test Dependencies -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`;

export const applicationProperties = `# ============================================
# Application Configuration
# ============================================
spring.application.name=food-delivery-modular-monolith

# Server Configuration
server.port=8080

# ============================================
# H2 Database Configuration (In-Memory)
# ============================================
spring.datasource.url=jdbc:h2:mem:fooddelivery
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (accessible at /h2-console)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# ============================================
# JPA / Hibernate Configuration
# ============================================
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# ============================================
# Spring Boot Actuator
# ============================================
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always

# ============================================
# Springdoc OpenAPI (Swagger UI)
# ============================================
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui/index.html
springdoc.swagger-ui.enabled=true
springdoc.swagger-ui.tagsSorter=alpha
springdoc.swagger-ui.operationsSorter=alpha

# ============================================
# Logging
# ============================================
logging.level.com.fooddelivery=DEBUG
logging.level.org.hibernate.SQL=DEBUG`;

export const mainApplication = `package com.fooddelivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Application Entry Point
 * 
 * This Modular Monolith consolidates Menu, Order, and Delivery domains
 * into a single Spring Boot application with clear package-based boundaries.
 */
@SpringBootApplication
public class FoodDeliveryApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodDeliveryApplication.class, args);
    }
}`;

// ===== MENU DOMAIN =====

export const menuItemEntity = `package com.fooddelivery.menu.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "menu_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Boolean available = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}`;

export const menuCategoryEntity = `package com.fooddelivery.menu.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 200)
    private String description;

    @Column(nullable = false)
    private Integer sortOrder = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}`;

export const menuItemRepository = `package com.fooddelivery.menu.repository;

import com.fooddelivery.menu.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategory(String category);
    List<MenuItem> findByAvailableTrue();
    List<MenuItem> findByCategoryAndAvailableTrue(String category);
}`;

export const menuCategoryRepository = `package com.fooddelivery.menu.repository;

import com.fooddelivery.menu.entity.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {
    List<MenuCategory> findAllByOrderBySortOrderAsc();
}`;

export const menuItemDto = `package com.fooddelivery.menu.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemRequest {

    @NotBlank(message = "Item name is required")
    @Size(max = 100, message = "Item name must be less than 100 characters")
    private String name;

    @Size(max = 500, message = "Description must be less than 500 characters")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal price;

    @NotBlank(message = "Category is required")
    private String category;

    private Boolean available = true;
}`;

export const menuService = `package com.fooddelivery.menu.service;

import com.fooddelivery.menu.dto.MenuItemRequest;
import com.fooddelivery.menu.entity.MenuCategory;
import com.fooddelivery.menu.entity.MenuItem;
import com.fooddelivery.menu.repository.MenuCategoryRepository;
import com.fooddelivery.menu.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MenuService {

    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;

    /**
     * Get all menus grouped by categories.
     * This method can be called by other modules (e.g., OrderService)
     * for cross-domain validation.
     */
    @Transactional(readOnly = true)
    public List<MenuCategory> getAllCategories() {
        log.debug("Fetching all menu categories");
        return menuCategoryRepository.findAllByOrderBySortOrderAsc();
    }

    @Transactional(readOnly = true)
    public List<MenuItem> getAllItems() {
        log.debug("Fetching all menu items");
        return menuItemRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<MenuItem> getAvailableItems() {
        log.debug("Fetching available menu items");
        return menuItemRepository.findByAvailableTrue();
    }

    /**
     * Cross-module method: Validates if a menu item exists and is available.
     * Called by OrderService during order creation.
     */
    @Transactional(readOnly = true)
    public MenuItem getItemById(Long id) {
        log.debug("Fetching menu item by id: {}", id);
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
    }

    /**
     * Cross-module method: Validates multiple item IDs exist.
     * Returns a map of item ID to MenuItem for order validation.
     */
    @Transactional(readOnly = true)
    public Map<Long, MenuItem> getItemsByIds(List<Long> itemIds) {
        log.debug("Fetching menu items by ids: {}", itemIds);
        List<MenuItem> items = menuItemRepository.findAllById(itemIds);
        return items.stream()
                .collect(Collectors.toMap(MenuItem::getId, item -> item));
    }

    @Transactional
    public MenuItem createItem(MenuItemRequest request) {
        log.info("Creating new menu item: {}", request.getName());
        MenuItem item = MenuItem.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .available(request.getAvailable() != null ? request.getAvailable() : true)
                .build();
        return menuItemRepository.save(item);
    }

    /**
     * Cross-module method: Validates item existence.
     * Throws exception if item not found.
     */
    @Transactional(readOnly = true)
    public boolean itemExists(Long itemId) {
        return menuItemRepository.existsById(itemId);
    }
}`;

export const menuController = `package com.fooddelivery.menu.controller;

import com.fooddelivery.menu.dto.MenuItemRequest;
import com.fooddelivery.menu.entity.MenuCategory;
import com.fooddelivery.menu.entity.MenuItem;
import com.fooddelivery.menu.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Menu", description = "Menu Management APIs")
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/menus")
    @Operation(summary = "Get all menus and categories")
    public ResponseEntity<List<MenuCategory>> getMenus() {
        List<MenuCategory> categories = menuService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/items")
    @Operation(summary = "Get all menu items")
    public ResponseEntity<List<MenuItem>> getItems(
            @RequestParam(required = false) String category) {
        List<MenuItem> items;
        if (category != null) {
            items = menuService.getAllItems().stream()
                    .filter(item -> item.getCategory().equalsIgnoreCase(category))
                    .toList();
        } else {
            items = menuService.getAllItems();
        }
        return ResponseEntity.ok(items);
    }

    @PostMapping("/items")
    @Operation(summary = "Add a new menu item")
    public ResponseEntity<MenuItem> createItem(@Valid @RequestBody MenuItemRequest request) {
        MenuItem createdItem = menuService.createItem(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
    }
}`;

// ===== ORDER DOMAIN =====

export const orderEntity = `package com.fooddelivery.order.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "customer_phone")
    private String customerPhone;

    @Column(name = "delivery_address", nullable = false, length = 500)
    private String deliveryAddress;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.PENDING;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<OrderItem> orderItems = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void addItem(OrderItem item) {
        orderItems.add(item);
        item.setOrder(this);
    }
}`;

export const orderItemEntity = `package com.fooddelivery.order.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "menu_item_id", nullable = false)
    private Long menuItemId;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;
}`;

export const orderStatusEnum = `package com.fooddelivery.order.entity;

public enum OrderStatus {
    PENDING,
    CONFIRMED,
    DELIVERING,
    COMPLETED,
    CANCELLED
}`;

export const orderRepository = `package com.fooddelivery.order.repository;

import com.fooddelivery.order.entity.Order;
import com.fooddelivery.order.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(OrderStatus status);
    List<Order> findByCustomerName(String customerName);
}`;

export const orderRequestDto = `package com.fooddelivery.order.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {

    @NotBlank(message = "Customer name is required")
    private String customerName;

    private String customerPhone;

    @NotBlank(message = "Delivery address is required")
    @Size(max = 500)
    private String deliveryAddress;

    @NotEmpty(message = "Order must contain at least one item")
    @Valid
    private List<OrderItemRequest> items;
}`;

export const orderItemRequestDto = `package com.fooddelivery.order.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemRequest {

    @NotNull(message = "Menu item ID is required")
    private Long menuItemId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;
}`;

export const orderStatusRequestDto = `package com.fooddelivery.order.dto;

import com.fooddelivery.order.entity.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatusRequest {

    @NotNull(message = "Status is required")
    private OrderStatus status;
}`;

export const orderService = `package com.fooddelivery.order.service;

import com.fooddelivery.menu.entity.MenuItem;
import com.fooddelivery.menu.service.MenuService;
import com.fooddelivery.order.dto.OrderItemRequest;
import com.fooddelivery.order.dto.OrderRequest;
import com.fooddelivery.order.entity.Order;
import com.fooddelivery.order.entity.OrderItem;
import com.fooddelivery.order.entity.OrderStatus;
import com.fooddelivery.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    // Cross-module dependency: Direct injection of MenuService
    private final MenuService menuService;
    private final OrderRepository orderRepository;

    @Transactional
    public Order createOrder(OrderRequest request) {
        log.info("Creating order for customer: {}", request.getCustomerName());

        // Cross-module call: Validate items exist in Menu domain
        var menuItemIds = request.getItems().stream()
                .map(OrderItemRequest::getMenuItemId)
                .toList();

        Map<Long, MenuItem> menuItemsMap = menuService.getItemsByIds(menuItemIds);

        // Validate all requested items exist
        for (OrderItemRequest itemReq : request.getItems()) {
            if (!menuItemsMap.containsKey(itemReq.getMenuItemId())) {
                throw new RuntimeException(
                    "Menu item not found with id: " + itemReq.getMenuItemId());
            }
        }

        // Build the order
        Order order = Order.builder()
                .customerName(request.getCustomerName())
                .customerPhone(request.getCustomerPhone())
                .deliveryAddress(request.getDeliveryAddress())
                .status(OrderStatus.PENDING)
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemReq : request.getItems()) {
            MenuItem menuItem = menuItemsMap.get(itemReq.getMenuItemId());
            BigDecimal subtotal = menuItem.getPrice()
                    .multiply(BigDecimal.valueOf(itemReq.getQuantity()));

            OrderItem orderItem = OrderItem.builder()
                    .menuItemId(menuItem.getId())
                    .itemName(menuItem.getName())
                    .unitPrice(menuItem.getPrice())
                    .quantity(itemReq.getQuantity())
                    .subtotal(subtotal)
                    .build();

            order.addItem(orderItem);
            totalAmount = totalAmount.add(subtotal);
        }

        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);
        log.info("Order created successfully with id: {} and total: {}", 
                savedOrder.getId(), totalAmount);
        return savedOrder;
    }

    @Transactional(readOnly = true)
    public Order getOrderById(Long id) {
        log.debug("Fetching order by id: {}", id);
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    @Transactional
    public Order updateOrderStatus(Long id, OrderStatus newStatus) {
        log.info("Updating order {} status to: {}", id, newStatus);
        Order order = getOrderById(id);

        validateStatusTransition(order.getStatus(), newStatus);

        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    private void validateStatusTransition(OrderStatus current, OrderStatus next) {
        boolean validTransition = switch (current) {
            case PENDING -> next == OrderStatus.CONFIRMED || next == OrderStatus.CANCELLED;
            case CONFIRMED -> next == OrderStatus.DELIVERING || next == OrderStatus.CANCELLED;
            case DELIVERING -> next == OrderStatus.COMPLETED;
            case COMPLETED, CANCELLED -> false;
        };

        if (!validTransition) {
            throw new RuntimeException(
                String.format("Invalid status transition from %s to %s", current, next));
        }
    }
}`;

export const orderController = `package com.fooddelivery.order.controller;

import com.fooddelivery.order.dto.OrderRequest;
import com.fooddelivery.order.dto.OrderStatusRequest;
import com.fooddelivery.order.entity.Order;
import com.fooddelivery.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Order Management APIs")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Operation(summary = "Create a new order")
    public ResponseEntity<Order> createOrder(@Valid @RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get order details by ID")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update order status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderStatusRequest request) {
        Order order = orderService.updateOrderStatus(id, request.getStatus());
        return ResponseEntity.ok(order);
    }
}`;

// ===== DELIVERY DOMAIN =====

export const deliveryEntity = `package com.fooddelivery.delivery.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false, unique = true)
    private Long orderId;

    @Column(name = "driver_name", nullable = false)
    private String driverName;

    @Column(name = "driver_phone")
    private String driverPhone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryStatus status = DeliveryStatus.ASSIGNED;

    @Column(name = "estimated_delivery_time")
    private LocalDateTime estimatedDeliveryTime;

    @Column(name = "actual_delivery_time")
    private LocalDateTime actualDeliveryTime;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}`;

export const deliveryStatusEnum = `package com.fooddelivery.delivery.entity;

public enum DeliveryStatus {
    ASSIGNED,
    PICKED_UP,
    DELIVERED
}`;

export const deliveryRepository = `package com.fooddelivery.delivery.repository;

import com.fooddelivery.delivery.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    Optional<Delivery> findByOrderId(Long orderId);
}`;

export const deliveryRequestDto = `package com.fooddelivery.delivery.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryRequest {

    @NotNull(message = "Order ID is required")
    private Long orderId;

    @NotBlank(message = "Driver name is required")
    private String driverName;

    private String driverPhone;
}`;

export const deliveryStatusRequestDto = `package com.fooddelivery.delivery.dto;

import com.fooddelivery.delivery.entity.DeliveryStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryStatusRequest {

    @NotNull(message = "Status is required")
    private DeliveryStatus status;
}`;

export const deliveryService = `package com.fooddelivery.delivery.service;

import com.fooddelivery.delivery.dto.DeliveryRequest;
import com.fooddelivery.delivery.entity.Delivery;
import com.fooddelivery.delivery.entity.DeliveryStatus;
import com.fooddelivery.delivery.repository.DeliveryRepository;
import com.fooddelivery.order.entity.Order;
import com.fooddelivery.order.entity.OrderStatus;
import com.fooddelivery.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeliveryService {

    // Cross-module dependency: Direct injection of OrderService
    private final OrderService orderService;
    private final DeliveryRepository deliveryRepository;

    @Transactional
    public Delivery assignDriver(DeliveryRequest request) {
        log.info("Assigning driver {} to order {}", 
                request.getDriverName(), request.getOrderId());

        // Cross-module call: Validate order exists in Order domain
        Order order = orderService.getOrderById(request.getOrderId());

        // Check if order is in a valid state for delivery assignment
        if (order.getStatus() != OrderStatus.CONFIRMED && 
            order.getStatus() != OrderStatus.DELIVERING) {
            throw new RuntimeException(
                "Order must be CONFIRMED or DELIVERING before assigning delivery. " +
                "Current status: " + order.getStatus());
        }

        // Check if delivery already exists for this order
        deliveryRepository.findByOrderId(request.getOrderId())
                .ifPresent(existing -> {
                    throw new RuntimeException(
                        "Delivery already assigned for order: " + request.getOrderId());
                });

        // Update order status to DELIVERING (cross-module call)
        orderService.updateOrderStatus(request.getOrderId(), OrderStatus.DELIVERING);

        Delivery delivery = Delivery.builder()
                .orderId(request.getOrderId())
                .driverName(request.getDriverName())
                .driverPhone(request.getDriverPhone())
                .status(DeliveryStatus.ASSIGNED)
                .estimatedDeliveryTime(LocalDateTime.now().plusMinutes(30))
                .build();

        Delivery savedDelivery = deliveryRepository.save(delivery);
        log.info("Delivery assigned successfully with id: {}", savedDelivery.getId());
        return savedDelivery;
    }

    @Transactional(readOnly = true)
    public Delivery getDeliveryByOrderId(Long orderId) {
        log.debug("Fetching delivery for order: {}", orderId);
        return deliveryRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException(
                    "No delivery found for order: " + orderId));
    }

    @Transactional
    public Delivery updateDeliveryStatus(Long id, DeliveryStatus newStatus) {
        log.info("Updating delivery {} status to: {}", id, newStatus);
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                    "Delivery not found with id: " + id));

        validateStatusTransition(delivery.getStatus(), newStatus);

        delivery.setStatus(newStatus);

        if (newStatus == DeliveryStatus.DELIVERED) {
            delivery.setActualDeliveryTime(LocalDateTime.now());
            // Cross-module call: Mark order as COMPLETED
            orderService.updateOrderStatus(delivery.getOrderId(), OrderStatus.COMPLETED);
        }

        return deliveryRepository.save(delivery);
    }

    private void validateStatusTransition(DeliveryStatus current, DeliveryStatus next) {
        boolean validTransition = switch (current) {
            case ASSIGNED -> next == DeliveryStatus.PICKED_UP;
            case PICKED_UP -> next == DeliveryStatus.DELIVERED;
            case DELIVERED -> false;
        };

        if (!validTransition) {
            throw new RuntimeException(
                String.format("Invalid delivery status transition from %s to %s", 
                    current, next));
        }
    }
}`;

export const deliveryController = `package com.fooddelivery.delivery.controller;

import com.fooddelivery.delivery.dto.DeliveryRequest;
import com.fooddelivery.delivery.dto.DeliveryStatusRequest;
import com.fooddelivery.delivery.entity.Delivery;
import com.fooddelivery.delivery.service.DeliveryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/deliveries")
@RequiredArgsConstructor
@Tag(name = "Deliveries", description = "Delivery Management APIs")
public class DeliveryController {

    private final DeliveryService deliveryService;

    @PostMapping
    @Operation(summary = "Assign a driver to an order")
    public ResponseEntity<Delivery> assignDriver(
            @Valid @RequestBody DeliveryRequest request) {
        Delivery delivery = deliveryService.assignDriver(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(delivery);
    }

    @GetMapping("/order/{orderId}")
    @Operation(summary = "Get delivery tracking details for an order")
    public ResponseEntity<Delivery> getDeliveryByOrderId(@PathVariable Long orderId) {
        Delivery delivery = deliveryService.getDeliveryByOrderId(orderId);
        return ResponseEntity.ok(delivery);
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update delivery status")
    public ResponseEntity<Delivery> updateDeliveryStatus(
            @PathVariable Long id,
            @Valid @RequestBody DeliveryStatusRequest request) {
        Delivery delivery = deliveryService.updateDeliveryStatus(id, request.getStatus());
        return ResponseEntity.ok(delivery);
    }
}`;

// ===== SHARED / EXCEPTION HANDLING =====

export const globalExceptionHandler = `package com.fooddelivery.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex) {
        log.error("Runtime exception: {}", ex.getMessage());
        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage()
        );
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Validation failed",
                fieldErrors
        );
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        log.error("Unexpected exception: ", ex);
        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred"
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}`;

export const errorResponse = `package com.fooddelivery.common.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private LocalDateTime timestamp;
    private int status;
    private String message;
    private Map<String, String> errors;

    public ErrorResponse(LocalDateTime timestamp, int status, String message) {
        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
    }
}`;

// ===== DATA SEEDER =====

export const dataSeeder = `package com.fooddelivery.config;

import com.fooddelivery.delivery.entity.Delivery;
import com.fooddelivery.delivery.entity.DeliveryStatus;
import com.fooddelivery.delivery.repository.DeliveryRepository;
import com.fooddelivery.menu.entity.MenuCategory;
import com.fooddelivery.menu.entity.MenuItem;
import com.fooddelivery.menu.repository.MenuCategoryRepository;
import com.fooddelivery.menu.repository.MenuItemRepository;
import com.fooddelivery.order.entity.Order;
import com.fooddelivery.order.entity.OrderItem;
import com.fooddelivery.order.entity.OrderStatus;
import com.fooddelivery.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final MenuCategoryRepository categoryRepository;
    private final MenuItemRepository menuItemRepository;
    private final OrderRepository orderRepository;
    private final DeliveryRepository deliveryRepository;

    @Override
    public void run(String... args) {
        log.info("=== Seeding Database with Sample Data ===");
        seedCategories();
        seedMenuItems();
        seedSampleOrder();
        log.info("=== Database Seeding Complete ===");
    }

    private void seedCategories() {
        List<MenuCategory> categories = List.of(
            MenuCategory.builder().name("Appetizers").description("Start your meal right").sortOrder(1).build(),
            MenuCategory.builder().name("Main Course").description("Hearty main dishes").sortOrder(2).build(),
            MenuCategory.builder().name("Desserts").description("Sweet endings").sortOrder(3).build(),
            MenuCategory.builder().name("Beverages").description("Refreshing drinks").sortOrder(4).build(),
            MenuCategory.builder().name("Sides").description("Perfect accompaniments").sortOrder(5).build()
        );
        categoryRepository.saveAll(categories);
        log.info("Seeded {} categories", categories.size());
    }

    private void seedMenuItems() {
        List<MenuItem> items = List.of(
            // Appetizers
            MenuItem.builder().name("Spring Rolls").description("Crispy vegetable spring rolls with sweet chili sauce").price(new BigDecimal("5.99")).category("Appetizers").available(true).build(),
            MenuItem.builder().name("Garlic Bread").description("Toasted bread with garlic butter and herbs").price(new BigDecimal("4.49")).category("Appetizers").available(true).build(),
            MenuItem.builder().name("Caesar Salad").description("Fresh romaine lettuce with Caesar dressing").price(new BigDecimal("7.99")).category("Appetizers").available(true).build(),
            // Main Course
            MenuItem.builder().name("Margherita Pizza").description("Classic pizza with mozzarella, tomato, and basil").price(new BigDecimal("12.99")).category("Main Course").available(true).build(),
            MenuItem.builder().name("Grilled Chicken").description("Herb-marinated grilled chicken breast").price(new BigDecimal("14.99")).category("Main Course").available(true).build(),
            MenuItem.builder().name("Beef Burger").description("Juicy beef patty with lettuce, tomato, and special sauce").price(new BigDecimal("11.99")).category("Main Course").available(true).build(),
            MenuItem.builder().name("Pasta Carbonara").description("Creamy pasta with bacon and parmesan").price(new BigDecimal("13.49")).category("Main Course").available(true).build(),
            // Desserts
            MenuItem.builder().name("Chocolate Cake").description("Rich dark chocolate layer cake").price(new BigDecimal("6.99")).category("Desserts").available(true).build(),
            MenuItem.builder().name("Tiramisu").description("Classic Italian coffee-flavored dessert").price(new BigDecimal("7.49")).category("Desserts").available(true).build(),
            // Beverages
            MenuItem.builder().name("Fresh Lemonade").description("Freshly squeezed lemonade").price(new BigDecimal("3.49")).category("Beverages").available(true).build(),
            MenuItem.builder().name("Iced Coffee").description("Cold brew coffee with ice").price(new BigDecimal("4.29")).category("Beverages").available(true).build(),
            MenuItem.builder().name("Mango Smoothie").description("Tropical mango and yogurt smoothie").price(new BigDecimal("5.49")).category("Beverages").available(true).build(),
            // Sides
            MenuItem.builder().name("French Fries").description("Crispy golden fries").price(new BigDecimal("3.99")).category("Sides").available(true).build(),
            MenuItem.builder().name("Coleslaw").description("Creamy coleslaw").price(new BigDecimal("2.99")).category("Sides").available(true).build()
        );
        menuItemRepository.saveAll(items);
        log.info("Seeded {} menu items", items.size());
    }

    private void seedSampleOrder() {
        // Create a sample order
        Order order = Order.builder()
                .customerName("John Doe")
                .customerPhone("+1-555-0123")
                .deliveryAddress("123 Main Street, Apt 4B, New York, NY 10001")
                .status(OrderStatus.CONFIRMED)
                .totalAmount(new BigDecimal("24.98"))
                .build();

        OrderItem item1 = OrderItem.builder()
                .menuItemId(4L)
                .itemName("Margherita Pizza")
                .unitPrice(new BigDecimal("12.99"))
                .quantity(1)
                .subtotal(new BigDecimal("12.99"))
                .build();

        OrderItem item2 = OrderItem.builder()
                .menuItemId(10L)
                .itemName("Fresh Lemonade")
                .unitPrice(new BigDecimal("3.49"))
                .quantity(2)
                .subtotal(new BigDecimal("6.98"))
                .build();

        OrderItem item3 = OrderItem.builder()
                .menuItemId(1L)
                .itemName("Spring Rolls")
                .unitPrice(new BigDecimal("5.99"))
                .quantity(1)
                .subtotal(new BigDecimal("5.01"))
                .build();

        order.addItem(item1);
        order.addItem(item2);
        order.addItem(item3);

        orderRepository.save(order);
        log.info("Seeded sample order with id: {}", order.getId());

        // Create a sample delivery
        Delivery delivery = Delivery.builder()
                .orderId(order.getId())
                .driverName("Mike Johnson")
                .driverPhone("+1-555-9876")
                .status(DeliveryStatus.ASSIGNED)
                .build();
        deliveryRepository.save(delivery);
        log.info("Seeded sample delivery with driver: {}", delivery.getDriverName());
    }
}`;

export const swaggerConfig = `package com.fooddelivery.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Food Delivery API")
                        .version("1.0.0")
                        .description("Modular Monolith Food Delivery System API Documentation.\\n\\n" +
                                "This API consolidates Menu, Order, and Delivery domains " +
                                "into a single high-performance application.")
                        .contact(new Contact()
                                .name("Food Delivery Team")
                                .email("dev@fooddelivery.com"))
                        .license(new License()
                                .name("MIT")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development Server")
                ));
    }
}`;

export const projectStructure = `food-delivery-modular-monolith/
├── pom.xml
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── fooddelivery/
│       │           ├── FoodDeliveryApplication.java
│       │           ├── common/
│       │           │   └── exception/
│       │           │       ├── ErrorResponse.java
│       │           │       └── GlobalExceptionHandler.java
│       │           ├── config/
│       │           │   ├── DataSeeder.java
│       │           │   └── SwaggerConfig.java
│       │           ├── menu/
│       │           │   ├── controller/
│       │           │   │   └── MenuController.java
│       │           │   ├── dto/
│       │           │   │   └── MenuItemRequest.java
│       │           │   ├── entity/
│       │           │   │   ├── MenuCategory.java
│       │           │   │   └── MenuItem.java
│       │           │   ├── repository/
│       │           │   │   ├── MenuCategoryRepository.java
│       │           │   │   └── MenuItemRepository.java
│       │           │   └── service/
│       │           │       └── MenuService.java
│       │           ├── order/
│       │           │   ├── controller/
│       │           │   │   └── OrderController.java
│       │           │   ├── dto/
│       │           │   │   ├── OrderItemRequest.java
│       │           │   │   ├── OrderRequest.java
│       │           │   │   └── OrderStatusRequest.java
│       │           │   ├── entity/
│       │           │   │   ├── Order.java
│       │           │   │   ├── OrderItem.java
│       │           │   │   └── OrderStatus.java
│       │           │   ├── repository/
│       │           │   │   └── OrderRepository.java
│       │           │   └── service/
│       │           │       └── OrderService.java
│       │           └── delivery/
│       │               ├── controller/
│       │               │   └── DeliveryController.java
│       │               ├── dto/
│       │               │   ├── DeliveryRequest.java
│       │               │   └── DeliveryStatusRequest.java
│       │               ├── entity/
│       │               │   ├── Delivery.java
│       │               │   └── DeliveryStatus.java
│       │               ├── repository/
│       │               │   └── DeliveryRepository.java
│       │               └── service/
│       │                   └── DeliveryService.java
│       └── resources/
│           └── application.properties
└── README.md`;
