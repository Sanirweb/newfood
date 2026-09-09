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
        MenuCategory foodCategory = new MenuCategory(null, "Main Course", "Delicious main dishes");
        MenuCategory drinkCategory = new MenuCategory(null, "Beverages", "Refreshing drinks");
        MenuCategory dessertCategory = new MenuCategory(null, "Desserts", "Sweet treats");
        
        foodCategory = categoryRepository.save(foodCategory);
        drinkCategory = categoryRepository.save(drinkCategory);
        dessertCategory = categoryRepository.save(dessertCategory);

        // Create menu items
        MenuItem pizza = new MenuItem(null, "Margherita Pizza", "Classic tomato and mozzarella pizza", 12.99, MenuItemType.FOOD, foodCategory, true);
        MenuItem burger = new MenuItem(null, "Cheeseburger", "Beef burger with cheese and vegetables", 10.99, MenuItemType.FOOD, foodCategory, true);
        MenuItem pasta = new MenuItem(null, "Spaghetti Carbonara", "Pasta with creamy carbonara sauce", 13.99, MenuItemType.FOOD, foodCategory, true);
        MenuItem coffee = new MenuItem(null, "Cappuccino", "Espresso with steamed milk foam", 4.99, MenuItemType.DRINK, drinkCategory, true);
        MenuItem tea = new MenuItem(null, "Green Tea", "Fresh green tea", 3.99, MenuItemType.DRINK, drinkCategory, true);
        MenuItem iceCream = new MenuItem(null, "Vanilla Ice Cream", "Creamy vanilla ice cream", 5.99, MenuItemType.DESSERT, dessertCategory, true);
        MenuItem cake = new MenuItem(null, "Chocolate Cake", "Rich chocolate layer cake", 7.99, MenuItemType.DESSERT, dessertCategory, true);

        menuItemRepository.save(pizza);
        menuItemRepository.save(burger);
        menuItemRepository.save(pasta);
        menuItemRepository.save(coffee);
        menuItemRepository.save(tea);
        menuItemRepository.save(iceCream);
        menuItemRepository.save(cake);

        System.out.println("Database seeded with sample data!");
    }
}
