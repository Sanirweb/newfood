package com.fooddelivery.menu.controller;

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
}
