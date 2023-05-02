package com.techtask.service.impl;

import com.techtask.model.RecipeDescriptionModel;
import com.techtask.model.RecipeModel;
import com.techtask.service.RecipesService;
import com.techtask.service.exceptions.NoRecipeException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;

@SpringBootTest
@Sql(scripts = "/init-data.sql")
@Sql(scripts = "/clean-data.sql", executionPhase = AFTER_TEST_METHOD)
@ActiveProfiles("test")
class RecipesServiceImplTest {

    @Autowired
    private RecipesService recipesService;

    @Test
    void findAll() {
        var res = recipesService.findAll(1, 3, Sort.Direction.ASC, "");

        assertNotNull(res.getContent());
        assertTrue(res.getTotalElements() > 0);
        assertEquals(2, res.getTotalPages());
        res.getContent().forEach(recipe -> {
            // should be null as it is lazy
            assertNull(recipe.description());
        });
    }

    @Test
    void findAllByName() {
        var res = recipesService.findAll(1, 3, Sort.Direction.ASC, "#1");

        assertNotNull(res.getContent());
        assertEquals(1, res.getTotalElements());
        assertEquals(1, res.getTotalPages());
        assertEquals("Recipe #1", res.getContent().get(0).name());
    }

    @Test
    void findById() {
        var res = recipesService.findById(101L);

        assertNotNull(res);
        assertNotNull(res.id());
        assertNotNull(res.name());
        assertNotNull(res.shortDescription());
        assertNotNull(res.description());
    }

    @Test
    void saveNew() {
        var newRecipe = new RecipeModel(
                null,
                "new recipe",
                "short description",
                new RecipeDescriptionModel(null, "recipe description ..."));

        var recipeId = recipesService.saveNew(newRecipe);
        var savedRecipe = recipesService.findById(recipeId);

        assertNotNull(savedRecipe);
        assertEquals(newRecipe.name(), savedRecipe.name());
        assertEquals(newRecipe.shortDescription(), savedRecipe.shortDescription());
        assertEquals(newRecipe.name(), savedRecipe.name());
        assertEquals(newRecipe.description().data(), savedRecipe.description().data());
    }

    @Test
    void update() {
        var recipe = recipesService.findById(101L);
        var newRecipe = new RecipeModel(
                recipe.id(),
                "updated name",
                recipe.shortDescription(),
                new RecipeDescriptionModel(recipe.description().id(), "updated description !")
        );

        recipesService.update(newRecipe);
        var updatedRecipe = recipesService.findById(newRecipe.id());

        assertNotNull(updatedRecipe);
        assertEquals(newRecipe.shortDescription(), updatedRecipe.shortDescription());
        assertEquals(newRecipe.name(), updatedRecipe.name());
        assertEquals(newRecipe.description().data(), updatedRecipe.description().data());
    }

    @Test
    void updateNotExistingRecipe() {
        var newRecipe = new RecipeModel(
                123L,
                "updated name",
                "short description",
                new RecipeDescriptionModel(123L, "updated description !")
        );

        Assertions.assertThrows(NoRecipeException.class, () -> {
            recipesService.update(newRecipe);
        });
    }

    @Test
    void delete() {
        var recipe = recipesService.findById(101L);
        assertNotNull(recipe);

        recipesService.delete(recipe.id());

        var deletedRecipe = recipesService.findById(101L);
        assertNull(deletedRecipe);
    }
}