# Bug Fixes Applied

## Issues Fixed

### 1. ✅ Lombok Compatibility with Java 25
**Problem**: `ExceptionInInitializerError: com.sun.tools.javac.code.TypeTag :: UNKNOWN`

**Root Cause**: Lombok 1.18.36 doesn't support Java 25. JDK 25 support was added in Lombok 1.18.40.

**Fix Applied**:
- Updated `pom.xml` to use Lombok **1.18.48**
- Added explicit `annotationProcessorPaths` configuration in maven-compiler-plugin

### 2. ✅ Spring Boot 4 Parameter Name Resolution
**Problem**: `Name for argument of type [java.lang.Long] not specified, and parameter name information not available via reflection. Ensure that the compiler uses the '-parameters' flag.`

**Root Cause**: Spring Boot 4 / Spring Framework 7 requires the `-parameters` compiler flag to retain parameter names in bytecode for reflection-based parameter resolution.

**Fix Applied**:
- Added `<compilerArgs><arg>-parameters</arg></compilerArgs>` to maven-compiler-plugin configuration

### 3. ✅ Infinite JSON Recursion (StackOverflow)
**Problem**: `Document nesting depth (501) exceeds the maximum allowed (500, from StreamWriteConstraints.getMaxNestingDepth())`

**Root Cause**: Bidirectional relationship between `Order` and `OrderItem` causes infinite recursion during JSON serialization:
- Order → orderItems → OrderItem → order → Order → ...

**Fix Applied**:
- Added `@JsonIgnore` annotation on the `order` field in `OrderItem` entity
- This breaks the circular reference during JSON serialization

## Files Modified

1. **food-delivery-backend/pom.xml**
   - Lombok version: 1.18.36 → 1.18.48
   - Added `-parameters` compiler flag
   - Added explicit annotation processor paths

2. **food-delivery-backend/src/main/java/com/fooddelivery/order/entity/OrderItem.java**
   - Added `@JsonIgnore` on `order` field

3. **src/data/javaCode.ts**
   - Updated code snippets to reflect the fixes

## How to Apply These Fixes

### Option 1: Clean Rebuild (Recommended)
```bash
cd food-delivery-backend

# Clean Maven cache for Lombok
mvn dependency:purge-local-repository

# Rebuild
mvn clean package -DskipTests

# Run
mvn spring-boot:run
```

### Option 2: Manual File Updates

If you need to manually update the files:

#### Update pom.xml
Find the maven-compiler-plugin section and ensure it has:
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.14.0</version>
    <configuration>
        <source>25</source>
        <target>25</target>
        <release>25</release>
        <!-- Add this section -->
        <compilerArgs>
            <arg>-parameters</arg>
        </compilerArgs>
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>1.18.48</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

And update the Lombok dependency:
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.48</version>
    <scope>provided</scope>
</dependency>
```

#### Update OrderItem.java
Add the import and annotation:
```java
import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @JsonIgnore  // Add this line
    private Order order;
    
    // ... rest of the fields
}
```

## Verification

After applying the fixes, test with these commands:

```bash
# 1. Create an order
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

# 2. Assign a driver
curl -X POST http://localhost:8080/api/v1/deliveries \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": 1,
    "driverName": "Alex Rivera",
    "driverPhone": "555-7890",
    "deliveryAddress": "456 Oak Ave"
  }'

# 3. Update delivery status (this was failing before)
curl -X PUT "http://localhost:8080/api/v1/deliveries/1/status?status=PICKED_UP"
curl -X PUT "http://localhost:8080/api/v1/deliveries/1/status?status=DELIVERED"
```

All three operations should now work without errors.

## Summary

✅ **Lombok 1.18.48** - Full Java 25 support  
✅ **-parameters flag** - Spring Boot 4 compatibility  
✅ **@JsonIgnore** - Prevents infinite JSON recursion  

The application is now fully compatible with Java 25 and Spring Boot 4.1.1.
