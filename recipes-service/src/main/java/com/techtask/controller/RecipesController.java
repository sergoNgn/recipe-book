package com.techtask.controller;

import com.techtask.model.RecipeModel;
import com.techtask.service.RecipesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipesController {

    private final RecipesService service;

    @GetMapping
    public ResponseEntity<Page<RecipeModel>> getAllRecipes(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "direction", required = false, defaultValue = "ASC") Sort.Direction direction,
            @RequestParam(value = "nameSearch", required = false, defaultValue = "") String nameSearch
    ) {
        return ResponseEntity.ok(service.findAll(page, size, direction, nameSearch));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeModel> getRecipeById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Long> saveNewRecipe(@RequestBody RecipeModel recipe) {
        return ResponseEntity.ok(service.saveNew(recipe));
    }

    @PutMapping
    public ResponseEntity<RecipeModel> updateRecipe(@RequestBody RecipeModel recipe) {
        return ResponseEntity.ok(service.update(recipe));
    }
}
