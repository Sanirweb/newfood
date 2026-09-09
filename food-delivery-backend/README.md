# Food Delivery Backend - Modular Monolith

A comprehensive food delivery backend system built as a modular monolith using Java 21, Spring Boot 3.3+, and an in-memory H2 database.

## 📁 Project Structure

```
food-delivery-backend/
│
├── pom.xml                                    # Maven configuration with all dependencies
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── fooddelivery/
│   │   │           │
│   │   │           ├── FoodDeliveryApplication.java          # Main application entry point
│   │   │           │
│   │   │           ├── shared/                               # Shared components across domains
│   │   │           │   ├── OrderStatus.java                  # Order status enum
│   │   │           │   ├── DeliveryStatus.java               # Delivery status enum
│   │   │           │   ├── MenuItemType.java                 # Menu item type enum
│   │   │           │   ├── ResourceNotFoundException.java    # Custom exception
│   │   │           │   ├── ValidationException.java          # Custom exception
│   │   │           │   └── GlobalExceptionHandler.java       # Global exception handler
│   │   │           │
│   │   │           ├── menu/                                 # Menu Domain Module
│   │   │           │   ├── entity/
│   │   │           │   │   ├── MenuCategory.java             # Category entity
│   │   │           │   │   └── MenuItem.java                 # Menu item entity
│   │   │           │   ├── repository/
│   │   │           │   │   ├── MenuCategoryRepository.java   # Category JPA repository
│   │   │           │   │   └── MenuItemRepository.java       # Menu item JPA repository
│   │   │           │   ├── service/
│   │   │           │   │   └── MenuService.java              # Menu business logic
│   │   │           │   └── controller/
│   │   │           │       └── MenuController.java           # Menu REST endpoints
│   │   │           │
│   │   │           ├── order/                                # Order Domain Module
│   │   │           │   ├── entity/
│   │   │           │   │   ├── Order.java                    # Order entity
│   │   │           │   │   └── OrderItem.java                # Order item entity
│   │   │           │   ├── repository/
│   │   │           │   │   └── OrderRepository.java          # Order JPA repository
│   │   │           │   ├── service/
│   │   │           │   │   └── OrderService.java             # Order business logic
│   │   │           │   └── controller/
│   │   │           │       └── OrderController.java          # Order REST endpoints
│   │   │           │
│   │   │           ├── delivery/                             # Delivery Domain Module
│   │   │           │   ├── entity/
│   │   │           │   │   └── Delivery.java                 # Delivery entity
│   │   │           │   ├── repository/
│   │   │           │   │   └── DeliveryRepository.java       # Delivery JPA repository
│   │   │           │   ├── service/
│   │   │           │   │   └── DeliveryService.java          # Delivery business logic
│   │   │           │   └── controller/
│   │   │           │       └── DeliveryController.java       # Delivery REST endpoints
│   │   │           │
│   │   │           └── config/                               # Configuration classes
│   │   │               ├── DataSeeder.java                   # Database seeder
│   │   │               └── SwaggerConfig.java                # OpenAPI/Swagger configuration
│   │   │
│   │   └── resources/
│   │       └── application.properties                        # Application configuration
│   │
│   └── test/
│       └── java/
│           └── com/
│               └── fooddelivery/                             # Test classes (empty for now)
│
└── README.md                                                 # This file
```

## 🏗️ Architecture Overview

### Modular Monolith Design

This application follows a modular monolith architecture where three distinct domains are packaged separately but run in a single JVM:

```
┌─────────────────────────────────────────────────────────────┐
│                    Spring Boot Application                   │
│                      (Port 8080)                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  Menu Module │    │ Order Module │    │Delivery Module│  │
│  │              │    │              │    │              │  │
│  │ • MenuItem   │    │ • Order      │    │ • Delivery   │  │
│  │ • Category   │    │ • OrderItem  │    │              │  │
│  │              │    │              │    │              │  │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘  │
│         │                   │                   │           │
│         └───────────────────┼───────────────────┘           │
│                             │                               │
│                    ┌────────▼────────┐                      │
│                    │  Shared Layer   │                      │
│                    │  • Enums        │                      │
│                    │  • Exceptions   │                      │
│                    └────────┬────────┘                      │
│                             │                               │
│                    ┌────────▼────────┐                      │
│                    │  H2 Database    │                      │
│                    │  (In-Memory)    │                      │
│                    └─────────────────┘                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Cross-Module Communication

- **OrderService** → **MenuService**: Validates menu items exist before creating orders
- **DeliveryService** → **OrderService**: Validates orders exist, updates order status on delivery completion

## 🛠️ Prerequisites

- **Java 21** or higher
- **Maven 3.6.0** or higher
- **Git** (optional, for cloning)

## 📦 Installation

### 1. Install Java 21

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-21-jdk

# macOS (Homebrew)
brew install openjdk@21

# Verify installation
java -version
```

### 2. Install Maven

```bash
# Ubuntu/Debian
sudo apt install maven

# macOS (Homebrew)
brew install maven

# Verify installation
mvn -version
```

### 3. Clone/Download the Project

```bash
cd food-delivery-backend
```

## 🚀 Build & Run

### Build the Application

```bash
mvn clean install
```

### Run the Application

```bash
# Option 1: Using Maven
mvn spring-boot:run

# Option 2: Using JAR
java -jar target/food-delivery-backend-1.0.0.jar
```

### Access Points

| Endpoint | URL | Description |
|----------|-----|-------------|
| Application | http://localhost:8080 | Root URL |
| Swagger UI | http://localhost:8080/swagger-ui.html | Interactive API docs |
| H2 Console | http://localhost:8080/h2-console | Database browser |
| Health Check | http://localhost:8080/actuator/health | Application health |

### H2 Console Credentials

- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (leave empty)

## 📡 API Reference

### Menu Domain

#### Get All Menu Items
```bash
GET /api/v1/items
```

#### Create Menu Item
```bash
POST /api/v1/items
Content-Type: application/json

{
  "name": "Veggie Pizza",
  "description": "Pizza with vegetables",
  "price": 14.99,
  "type": "FOOD",
  "categoryId": 1
}
```

#### Get All Menu Categories
```bash
GET /api/v1/menus
```

### Order Domain

#### Create Order
```bash
POST /api/v1/orders
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerAddress": "123 Main St",
  "customerPhone": "555-1234",
  "orderItems": [
    {
      "menuItemId": 1,
      "menuItemName": "Margherita Pizza",
      "quantity": 2,
      "unitPrice": 12.99
    }
  ]
}
```

#### Get Order by ID
```bash
GET /api/v1/orders/{id}
```

#### Update Order Status
```bash
PUT /api/v1/orders/{id}/status?status=CONFIRMED
```

**Valid Status Transitions:**
- `PENDING` → `CONFIRMED` or `CANCELLED`
- `CONFIRMED` → `DELIVERING` or `CANCELLED`
- `DELIVERING` → `COMPLETED` or `CANCELLED`

### Delivery Domain

#### Assign Driver
```bash
POST /api/v1/deliveries
Content-Type: application/json

{
  "orderId": 1,
  "driverName": "Mike Johnson",
  "driverPhone": "555-5678",
  "deliveryAddress": "123 Main St"
}
```

#### Get Deliveries for Order
```bash
GET /api/v1/deliveries/order/{orderId}
```

#### Update Delivery Status
```bash
PUT /api/v1/deliveries/{id}/status?status=PICKED_UP
```

**Valid Status Transitions:**
- `ASSIGNED` → `PICKED_UP` or `DELIVERED`
- `PICKED_UP` → `DELIVERED`

## 🧪 Testing with cURL

### Menu Tests
```bash
# Get all menu items
curl -X GET http://localhost:8080/api/v1/items

# Get all categories
curl -X GET http://localhost:8080/api/v1/menus

# Create a new menu item
curl -X POST http://localhost:8080/api/v1/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Veggie Pizza",
    "description": "Pizza with vegetables",
    "price": 14.99,
    "type": "FOOD",
    "categoryId": 1
  }'
```

### Order Tests
```bash
# Create a new order
curl -X POST http://localhost:8080/api/v1/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Jane Smith",
    "customerAddress": "456 Oak Ave",
    "customerPhone": "555-9876",
    "orderItems": [
      {
        "menuItemId": 1,
        "menuItemName": "Margherita Pizza",
        "quantity": 1,
        "unitPrice": 12.99
      }
    ]
  }'

# Get order by ID
curl -X GET http://localhost:8080/api/v1/orders/1

# Update order status
curl -X PUT "http://localhost:8080/api/v1/orders/1/status?status=CONFIRMED"
```

### Delivery Tests
```bash
# Assign driver to order
curl -X POST http://localhost:8080/api/v1/deliveries \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": 1,
    "driverName": "Sarah Wilson",
    "driverPhone": "555-4321",
    "deliveryAddress": "456 Oak Ave"
  }'

# Get deliveries for order
curl -X GET http://localhost:8080/api/v1/deliveries/order/1

# Update delivery status
curl -X PUT "http://localhost:8080/api/v1/deliveries/1/status?status=PICKED_UP"
curl -X PUT "http://localhost:8080/api/v1/deliveries/1/status?status=DELIVERED"
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Error: `Port 8080 was already in use`
   - Solution: Stop other applications using port 8080 or change `server.port` in `application.properties`

2. **Java Version Mismatch**
   - Error: `Unsupported class file major version`
   - Solution: Ensure you're using Java 21 (`java -version`)

3. **Maven Dependencies Not Found**
   - Solution: Run `mvn dependency:resolve`

4. **H2 Console Not Accessible**
   - Use JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: (empty)

5. **Lombok Not Working in IDE**
   - Enable annotation processing in IDE settings
   - IntelliJ: Settings → Build → Compiler → Annotations → Enable

## 📝 Notes

- The application automatically seeds sample data on startup
- H2 database is in-memory (data is lost on restart)
- All modules communicate via direct service injection (no HTTP calls)
- Status transitions are validated to maintain data integrity

## 📄 License

MIT License
