# Food Delivery Backend - Modular Monolith

A comprehensive food delivery backend system built as a modular monolith using **Java 25** (LTS), **Spring Boot 4.1.1**, and an in-memory H2 database.

## 📁 Project Structure

```
food-delivery-backend/
│
├── pom.xml                                    # Maven config (Java 25, Spring Boot 4.1.1)
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── fooddelivery/
│       │           │
│       │           ├── FoodDeliveryApplication.java          # Main entry point
│       │           │
│       │           ├── shared/                               # Shared components
│       │           │   ├── OrderStatus.java                  # Order status enum
│       │           │   ├── DeliveryStatus.java               # Delivery status enum
│       │           │   ├── MenuItemType.java                 # Menu item type enum
│       │           │   ├── ResourceNotFoundException.java    # Custom exception
│       │           │   ├── ValidationException.java          # Custom exception
│       │           │   └── GlobalExceptionHandler.java       # Global exception handler
│       │           │
│       │           ├── menu/                                 # Menu Domain Module
│       │           │   ├── entity/
│       │           │   │   ├── MenuCategory.java
│       │           │   │   └── MenuItem.java
│       │           │   ├── repository/
│       │           │   │   ├── MenuCategoryRepository.java
│       │           │   │   └── MenuItemRepository.java
│       │           │   ├── service/
│       │           │   │   └── MenuService.java
│       │           │   └── controller/
│       │           │       └── MenuController.java
│       │           │
│       │           ├── order/                                # Order Domain Module
│       │           │   ├── entity/
│       │           │   │   ├── Order.java
│       │           │   │   └── OrderItem.java
│       │           │   ├── repository/
│       │           │   │   └── OrderRepository.java
│       │           │   ├── service/
│       │           │   │   └── OrderService.java
│       │           │   └── controller/
│       │           │       └── OrderController.java
│       │           │
│       │           ├── delivery/                             # Delivery Domain Module
│       │           │   ├── entity/
│       │           │   │   └── Delivery.java
│       │           │   ├── repository/
│       │           │   │   └── DeliveryRepository.java
│       │           │   ├── service/
│       │           │   │   └── DeliveryService.java
│       │           │   └── controller/
│       │           │       └── DeliveryController.java
│       │           │
│       │           └── config/                               # Configuration classes
│       │               ├── DataSeeder.java                   # Database seeder
│       │               └── SwaggerConfig.java                # OpenAPI/Swagger config
│       │
│       └── resources/
│           └── application.properties                        # Application configuration
│
└── README.md
```

## 🛠️ Tech Stack

| Component | Version | Notes |
|-----------|---------|-------|
| **Java** | 25 (LTS) | Released September 2025 |
| **Spring Boot** | 4.1.1 | Latest stable, supports Java 17-26 |
| **Spring Framework** | 7.0.x | Required by Spring Boot 4 |
| **Jakarta EE** | 11 | Servlet 6.1 baseline |
| **Hibernate** | 7.x | Via Spring Data JPA |
| **H2 Database** | Latest | In-memory |
| **Jackson** | 3.x | Spring Boot 4 default |
| **Springdoc OpenAPI** | 3.1.1 | Compatible with Spring Boot 4 |
| **Lombok** | 1.18.36 | Latest |
| **Maven** | 3.9+ | Build tool |

## 🚀 Prerequisites

### 1. Install Java 25

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-25-jdk

# macOS (Homebrew)
brew install openjdk@25

# SDKMAN (recommended)
curl -s "https://get.sdkman.io" | bash
sdk install java 25-open
sdk use java 25-open

# Verify
java -version
# Expected: openjdk version "25" ...
```

### 2. Install Maven 3.9+

```bash
# Ubuntu/Debian
sudo apt install maven

# macOS
brew install maven

# SDKMAN
sdk install maven

# Verify
mvn -version
```

## 📦 Build & Run

```bash
# Navigate to project
cd food-delivery-backend

# Build
mvn clean install

# Run
mvn spring-boot:run

# Or run the JAR directly
java -jar target/food-delivery-backend-1.0.0.jar
```

## 🌐 Access Points

| Endpoint | URL | Description |
|----------|-----|-------------|
| REST API | http://localhost:8080/api/v1 | Base URL |
| Swagger UI | http://localhost:8080/swagger-ui.html | Interactive API docs |
| H2 Console | http://localhost:8080/h2-console | Database browser |
| Health Check | http://localhost:8080/actuator/health | Application health |
| API Docs (JSON) | http://localhost:8080/api-docs | OpenAPI JSON |

### H2 Console Credentials
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (leave empty)

## 📡 API Reference

### Menu Domain
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/menus` | Get all categories |
| GET | `/api/v1/items` | Get all menu items |
| POST | `/api/v1/items` | Create menu item |

### Order Domain
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/orders` | Create order |
| GET | `/api/v1/orders/{id}` | Get order by ID |
| PUT | `/api/v1/orders/{id}/status?status=X` | Update status |

### Delivery Domain
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/deliveries` | Assign driver |
| GET | `/api/v1/deliveries/order/{orderId}` | Get deliveries |
| PUT | `/api/v1/deliveries/{id}/status?status=X` | Update status |

### Status Transitions
- **Order**: PENDING → CONFIRMED → DELIVERING → COMPLETED (or CANCELLED at any stage)
- **Delivery**: ASSIGNED → PICKED_UP → DELIVERED

## 🧪 Testing with cURL

```bash
# Get all menu items
curl http://localhost:8080/api/v1/items

# Create an order
curl -X POST http://localhost:8080/api/v1/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Jane Smith",
    "customerAddress": "456 Oak Ave",
    "customerPhone": "555-9876",
    "orderItems": [
      {"menuItemId": 1, "menuItemName": "Margherita Pizza", "quantity": 2, "unitPrice": 12.99}
    ]
  }'

# Update order status
curl -X PUT "http://localhost:8080/api/v1/orders/1/status?status=CONFIRMED"

# Assign driver
curl -X POST http://localhost:8080/api/v1/deliveries \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": 1,
    "driverName": "Alex Rivera",
    "driverPhone": "555-7890",
    "deliveryAddress": "456 Oak Ave"
  }'

# Update delivery status
curl -X PUT "http://localhost:8080/api/v1/deliveries/1/status?status=PICKED_UP"
curl -X PUT "http://localhost:8080/api/v1/deliveries/1/status?status=DELIVERED"
```

## 🔄 Spring Boot 4 Migration Notes

This project uses Spring Boot 4.1.1 which includes:

- **Modular Starters**: `spring-boot-starter-web` → `spring-boot-starter-webmvc`
- **Jackson 3**: Default JSON library (new `tools.jackson` packages)
- **Jakarta EE 11**: Servlet 6.1 baseline
- **Hibernate 7**: Latest ORM with Java 25 support
- **Modular Test Starters**: `spring-boot-starter-webmvc-test`, `spring-boot-starter-data-jpa-test`
- **JSpecify Annotations**: Better null-safety support

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8080 in use | Change `server.port` in application.properties |
| Java version mismatch | Ensure `JAVA_HOME` points to JDK 25 |
| Lombok not working | Enable annotation processing in IDE |
| H2 console not working | Use JDBC URL: `jdbc:h2:mem:testdb`, user: `sa`, no password |
| Maven build fails | Run `mvn clean` first, ensure Maven 3.9+ |

## 📄 License

MIT License
