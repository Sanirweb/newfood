export const pomXml = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.fooddelivery</groupId>
    <artifactId>food-delivery-backend</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>Food Delivery Backend</name>
    <description>Modular Monolith Food Delivery System</description>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <spring.boot.version>3.3.0</spring.boot.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>\${spring.boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.1.0</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.30</version>
            <scope>provided</scope>
        </dependency>
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
                <version>\${spring.boot.version}</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>`;

export const applicationProperties = `# Server Configuration
server.port=8080

# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Actuator
management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=always

# Logging
logging.level.com.fooddelivery=DEBUG

# SpringDoc
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html`;

export const mainApplication = `package com.fooddelivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FoodDeliveryApplication {
    public static void main(String[] args) {
        SpringApplication.run(FoodDeliveryApplication.class, args);
    }
}`;

export const sharedEnums = `// ===== OrderStatus.java =====
package com.fooddelivery.shared;

public enum OrderStatus {
    PENDING,
    CONFIRMED,
    DELIVERING,
    COMPLETED,
    CANCELLED
}

// ===== DeliveryStatus.java =====
package com.fooddelivery.shared;

public enum DeliveryStatus {
    ASSIGNED,
    PICKED_UP,
    DELIVERED
}

// ===== MenuItemType.java =====
package com.fooddelivery.shared;

public enum MenuItemType {
    FOOD,
    DRINK,
    DESSERT
}`;

export const sharedExceptions = `// ===== ResourceNotFoundException.java =====
package com.fooddelivery.shared;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

// ===== ValidationException.java =====
package com.fooddelivery.shared;

public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}`;

export const globalExceptionHandler = `package com.fooddelivery.shared;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Invalid parameter type: " + ex.getName()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "An unexpected error occurred: " + ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public static class ErrorResponse {
        private LocalDateTime timestamp;
        private int status;
        private String message;

        public ErrorResponse(LocalDateTime timestamp, int status, String message) {
            this.timestamp = timestamp;
            this.status = status;
            this.message = message;
        }

        public LocalDateTime getTimestamp() { return timestamp; }
        public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
        public int getStatus() { return status; }
        public void setStatus(int status) { this.status = status; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}`;

export const menuEntities = `// ===== MenuCategory.java =====
package com.fooddelivery.menu.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "menu_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;
}

// ===== MenuItem.java =====
package com.fooddelivery.menu.entity;

import com.fooddelivery.shared.MenuItemType;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    private String description;

    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @Column(nullable = false)
    private Double price;

    @NotNull(message = "Type is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MenuItemType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private MenuCategory category;

    @Column(nullable = false)
    private Boolean available = true;
}`;

export const menuRepositories = `// ===== MenuItemRepository.java =====
package com.fooddelivery.menu.repository;

import com.fooddelivery.menu.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByAvailableTrue();
    List<MenuItem> findByCategoryId(Long categoryId);
    List<MenuItem> findByNameContainingIgnoreCase(String name);
}

// ===== MenuCategoryRepository.java =====
package com.fooddelivery.menu.repository;

import com.fooddelivery.menu.entity.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {
}`;

export const menuService = `package com.fooddelivery.menu.service;

import com.fooddelivery.menu.entity.MenuItem;
import com.fooddelivery.menu.entity.MenuCategory;
import com.fooddelivery.menu.repository.MenuItemRepository;
import com.fooddelivery.menu.repository.MenuCategoryRepository;
import com.fooddelivery.shared.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private MenuCategoryRepository menuCategoryRepository;

    public List<MenuItem> getAllItems() {
        return menuItemRepository.findByAvailableTrue();
    }

    public MenuItem getItemById(Long id) {
        Optional<MenuItem> item = menuItemRepository.findById(id);
        if (item.isEmpty()) {
            throw new ValidationException("Menu item not found with id: " + id);
        }
        return item.get();
    }

    public MenuItem createItem(MenuItem item) {
        if (item.getCategory() != null && item.getCategory().getId() != null) {
            Optional<MenuCategory> category = menuCategoryRepository.findById(item.getCategory().getId());
            if (category.isEmpty()) {
                throw new ValidationException("Category not found with id: " + item.getCategory().getId());
            }
        }
        return menuItemRepository.save(item);
    }

    public List<MenuCategory> getAllCategories() {
        return menuCategoryRepository.findAll();
    }

    public boolean validateItemExists(Long itemId) {
        return menuItemRepository.existsById(itemId);
    }
}`;

export const menuController = `package com.fooddelivery.menu.controller;

import com.fooddelivery.menu.entity.MenuItem;
import com.fooddelivery.menu.entity.MenuCategory;
import com.fooddelivery.menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping("/items")
    public ResponseEntity<List<MenuItem>> getAllItems() {
        List<MenuItem> items = menuService.getAllItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping("/items")
    public ResponseEntity<MenuItem> createItem(@RequestBody MenuItem item) {
        MenuItem savedItem = menuService.createItem(item);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    @GetMapping("/menus")
    public ResponseEntity<List<MenuCategory>> getAllMenus() {
        List<MenuCategory> categories = menuService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}`;

export const orderEntity = `// ===== Order.java =====
package com.fooddelivery.order.entity;

import com.fooddelivery.shared.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<OrderItem> orderItems = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.PENDING;

    @Column(nullable = false)
    private Double totalAmount = 0.0;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerAddress;

    @Column(nullable = false)
    private String customerPhone;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;
    private LocalDateTime completedAt;
}

// ===== OrderItem.java =====
package com.fooddelivery.order.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(nullable = false)
    private Long menuItemId;

    @Column(nullable = false)
    private String menuItemName;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double unitPrice;

    @Column(nullable = false)
    private Double totalPrice;
}`;

export const orderRepository = `package com.fooddelivery.order.repository;

import com.fooddelivery.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}`;

export const orderService = `package com.fooddelivery.order.service;

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
    private MenuService menuService;  // Cross-module dependency

    public Order createOrder(Order order) {
        // Validate all menu items exist (cross-module call to MenuService)
        for (OrderItem item : order.getOrderItems()) {
            if (!menuService.validateItemExists(item.getMenuItemId())) {
                throw new ValidationException("Menu item not found with id: " + item.getMenuItemId());
            }
            double itemTotal = item.getUnitPrice() * item.getQuantity();
            item.setTotalPrice(itemTotal);
            item.setOrder(order);
        }

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
                if (next != OrderStatus.CONFIRMED && next != OrderStatus.CANCELLED)
                    throw new ValidationException("Cannot transition from PENDING to " + next);
                break;
            case CONFIRMED:
                if (next != OrderStatus.DELIVERING && next != OrderStatus.CANCELLED)
                    throw new ValidationException("Cannot transition from CONFIRMED to " + next);
                break;
            case DELIVERING:
                if (next != OrderStatus.COMPLETED && next != OrderStatus.CANCELLED)
                    throw new ValidationException("Cannot transition from DELIVERING to " + next);
                break;
            case COMPLETED:
            case CANCELLED:
                throw new ValidationException("Cannot change status of COMPLETED or CANCELLED order");
        }
    }
}`;

export const orderController = `package com.fooddelivery.order.controller;

import com.fooddelivery.order.entity.Order;
import com.fooddelivery.order.service.OrderService;
import com.fooddelivery.shared.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order savedOrder = orderService.createOrder(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        Order updatedOrder = orderService.updateOrderStatus(id, status);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }
}`;

export const deliveryEntity = `package com.fooddelivery.delivery.entity;

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
}`;

export const deliveryRepository = `package com.fooddelivery.delivery.repository;

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
}`;

export const deliveryService = `package com.fooddelivery.delivery.service;

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
    private OrderService orderService;  // Cross-module dependency

    public Delivery assignDriver(Delivery delivery) {
        // Cross-module call: validate order exists
        orderService.getOrderById(delivery.getOrderId());
        
        Optional<Delivery> existingDelivery = deliveryRepository.findByOrderIdAndStatusNot(
            delivery.getOrderId(), DeliveryStatus.DELIVERED
        );
        if (existingDelivery.isPresent()) {
            throw new ValidationException("Active delivery already exists for order: " + delivery.getOrderId());
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
        validateStatusTransition(existingDelivery.getStatus(), newStatus);
        
        existingDelivery.setStatus(newStatus);
        existingDelivery.setUpdatedAt(LocalDateTime.now());
        
        switch (newStatus) {
            case PICKED_UP:
                existingDelivery.setPickedUpAt(LocalDateTime.now());
                break;
            case DELIVERED:
                existingDelivery.setDeliveredAt(LocalDateTime.now());
                // Cross-module call: update order status to COMPLETED
                try {
                    orderService.updateOrderStatus(existingDelivery.getOrderId(), OrderStatus.COMPLETED);
                } catch (Exception e) {
                    System.err.println("Failed to update order status: " + e.getMessage());
                }
                break;
        }
        return deliveryRepository.save(existingDelivery);
    }

    private void validateStatusTransition(DeliveryStatus current, DeliveryStatus next) {
        switch (current) {
            case ASSIGNED:
                if (next != DeliveryStatus.PICKED_UP && next != DeliveryStatus.DELIVERED)
                    throw new ValidationException("Cannot transition from ASSIGNED to " + next);
                break;
            case PICKED_UP:
                if (next != DeliveryStatus.DELIVERED)
                    throw new ValidationException("Cannot transition from PICKED_UP to " + next);
                break;
            case DELIVERED:
                throw new ValidationException("Cannot change status of DELIVERED delivery");
        }
    }
}`;

export const deliveryController = `package com.fooddelivery.delivery.controller;

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
}`;

export const dataSeeder = `package com.fooddelivery.config;

import com.fooddelivery.menu.entity.MenuCategory;
import com.fooddelivery.menu.entity.MenuItem;
import com.fooddelivery.menu.repository.MenuCategoryRepository;
import com.fooddelivery.menu.repository.MenuItemRepository;
import com.fooddelivery.shared.MenuItemType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private MenuCategoryRepository categoryRepository;
    
    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public void run(String... args) throws Exception {
        MenuCategory foodCategory = new MenuCategory(null, "Main Course", "Delicious main dishes");
        MenuCategory drinkCategory = new MenuCategory(null, "Beverages", "Refreshing drinks");
        MenuCategory dessertCategory = new MenuCategory(null, "Desserts", "Sweet treats");
        
        foodCategory = categoryRepository.save(foodCategory);
        drinkCategory = categoryRepository.save(drinkCategory);
        dessertCategory = categoryRepository.save(dessertCategory);

        menuItemRepository.save(new MenuItem(null, "Margherita Pizza", "Classic tomato and mozzarella", 12.99, MenuItemType.FOOD, foodCategory, true));
        menuItemRepository.save(new MenuItem(null, "Cheeseburger", "Beef burger with cheese", 10.99, MenuItemType.FOOD, foodCategory, true));
        menuItemRepository.save(new MenuItem(null, "Spaghetti Carbonara", "Pasta with creamy sauce", 13.99, MenuItemType.FOOD, foodCategory, true));
        menuItemRepository.save(new MenuItem(null, "Cappuccino", "Espresso with steamed milk", 4.99, MenuItemType.DRINK, drinkCategory, true));
        menuItemRepository.save(new MenuItem(null, "Green Tea", "Fresh green tea", 3.99, MenuItemType.DRINK, drinkCategory, true));
        menuItemRepository.save(new MenuItem(null, "Vanilla Ice Cream", "Creamy vanilla ice cream", 5.99, MenuItemType.DESSERT, dessertCategory, true));
        menuItemRepository.save(new MenuItem(null, "Chocolate Cake", "Rich chocolate cake", 7.99, MenuItemType.DESSERT, dessertCategory, true));

        System.out.println("Database seeded with sample data!");
    }
}`;

export const swaggerConfig = `package com.fooddelivery.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Food Delivery API")
                        .version("1.0")
                        .description("Modular Monolith Food Delivery System API"));
    }
}`;

export const projectStructure = `food-delivery-backend/
├── pom.xml
├── README.md
└── src/main/
    ├── java/com/fooddelivery/
    │   ├── FoodDeliveryApplication.java
    │   ├── shared/
    │   │   ├── OrderStatus.java
    │   │   ├── DeliveryStatus.java
    │   │   ├── MenuItemType.java
    │   │   ├── ResourceNotFoundException.java
    │   │   ├── ValidationException.java
    │   │   └── GlobalExceptionHandler.java
    │   ├── menu/
    │   │   ├── entity/
    │   │   │   ├── MenuCategory.java
    │   │   │   └── MenuItem.java
    │   │   ├── repository/
    │   │   │   ├── MenuCategoryRepository.java
    │   │   │   └── MenuItemRepository.java
    │   │   ├── service/
    │   │   │   └── MenuService.java
    │   │   └── controller/
    │   │       └── MenuController.java
    │   ├── order/
    │   │   ├── entity/
    │   │   │   ├── Order.java
    │   │   │   └── OrderItem.java
    │   │   ├── repository/
    │   │   │   └── OrderRepository.java
    │   │   ├── service/
    │   │   │   └── OrderService.java
    │   │   └── controller/
    │   │       └── OrderController.java
    │   ├── delivery/
    │   │   ├── entity/
    │   │   │   └── Delivery.java
    │   │   ├── repository/
    │   │   │   └── DeliveryRepository.java
    │   │   ├── service/
    │   │   │   └── DeliveryService.java
    │   │   └── controller/
    │   │       └── DeliveryController.java
    │   └── config/
    │       ├── DataSeeder.java
    │       └── SwaggerConfig.java
    └── resources/
        └── application.properties`;
