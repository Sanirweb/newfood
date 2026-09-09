package com.fooddelivery.menu.service;

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
        // Validate category exists if provided
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
}
