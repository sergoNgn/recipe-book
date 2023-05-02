package com.techtask.controller;

import com.techtask.model.RecipeDescriptionModel;
import com.techtask.model.RecipeModel;
import com.techtask.service.RecipesService;
import com.techtask.service.exceptions.NoRecipeException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RecipesController.class)
class RecipesControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private RecipesService recipesService;

    @Test
    void getAllRecipes() throws Exception {
        mvc.perform(get("/recipes")
                        .accept(MediaType.APPLICATION_JSON)
                        .param("page", "1")
                        .param("size", "5")
                        .param("order", "ASC")
                )
                .andExpect(status().isOk());
    }

    @Test
    void getRecipeById() throws Exception {
        mvc.perform(get("/recipes/1").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void deleteRecipe() throws Exception {
        mvc.perform(delete("/recipes/1")).andExpect(status().isNoContent());
    }

    @Test
    void saveNewRecipe() throws Exception {
        var mapper = new ObjectMapper();
        var description = new RecipeDescriptionModel(null, "3");
        var recipe = new RecipeModel(null, "1", "2", description);

        mvc.perform(post("/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(recipe)))
                .andExpect(status().isOk());
    }

    @Test
    void updateRecipe() throws Exception {
        var mapper = new ObjectMapper();
        var description = new RecipeDescriptionModel(null, "3");
        var recipe = new RecipeModel(null, "1", "2", description);

        mvc.perform(put("/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(recipe)))
                .andExpect(status().isOk());
    }

    @Test
    void updateRecipeNotFound() throws Exception {
        var mapper = new ObjectMapper();
        var description = new RecipeDescriptionModel(null, "3");
        var recipe = new RecipeModel(null, "1", "2", description);
        when(recipesService.update(any(RecipeModel.class))).thenThrow(new NoRecipeException());

        mvc.perform(put("/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(recipe)))
                .andExpect(status().isNotFound());
    }
}