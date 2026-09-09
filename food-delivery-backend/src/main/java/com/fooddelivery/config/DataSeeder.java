package com.fooddelivery.config;

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
        // Create categories
        MenuCategory foodCategory = new MenuCategory();
        foodCategory.setName("Main Course");
        foodCategory.setDescription("Delicious main dishes");
        foodCategory = categoryRepository.save(foodCategory);

        MenuCategory drinkCategory = new MenuCategory();
        drinkCategory.setName("Beverages");
        drinkCategory.setDescription("Refreshing drinks");
        drinkCategory = categoryRepository.save(drinkCategory);

        MenuCategory dessertCategory = new MenuCategory();
        dessertCategory.setName("Desserts");
        dessertCategory.setDescription("Sweet treats");
        dessertCategory = categoryRepository.save(dessertCategory);

        // Create menu items
        createMenuItem("Margherita Pizza", "Classic tomato and mozzarella", 12.99, MenuItemType.FOOD, foodCategory);
        createMenuItem("Cheeseburger", "Beef burger with cheese and vegetables", 10.99, MenuItemType.FOOD, foodCategory);
        createMenuItem("Spaghetti Carbonara", "Pasta with creamy carbonara sauce", 13.99, MenuItemType.FOOD, foodCategory);
        createMenuItem("Cappuccino", "Espresso with steamed milk foam", 4.99, MenuItemType.DRINK, drinkCategory);
        createMenuItem("Green Tea", "Fresh green tea", 3.99, MenuItemType.DRINK, drinkCategory);
        createMenuItem("Vanilla Ice Cream", "Creamy vanilla ice cream", 5.99, MenuItemType.DESSERT, dessertCategory);
        createMenuItem("Chocolate Cake", "Rich chocolate layer cake", 7.99, MenuItemType.DESSERT, dessertCategory);

        System.out.println("=== Database seeded with sample data! ===");
    }

    private void createMenuItem(String name, String description, double price, MenuItemType type, MenuCategory category) {
        MenuItem item = new MenuItem();
        item.setName(name);
        item.setDescription(description);
        item.setPrice(price);
        item.setType(type);
        item.setCategory(category);
        item.setAvailable(true);
        menuItemRepository.save(item);
    }
}
