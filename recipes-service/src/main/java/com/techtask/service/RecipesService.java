package com.techtask.service;

import com.techtask.model.RecipeModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

public interface RecipesService {

    /**
     * getting all recipes (without descriptions)
     * with default page = 1 and size of 8
     * ASC ordered by createdAt filed by default
     * additionally filtered by name
     *
     * @param page - page
     * @param size - size of page
     * @param direction - sort direction ASC/DESC
     * @param nameSearch - optional search name
     *
     * @return Page with RecipeModel list
     */
    Page<RecipeModel> findAll(int page, int size, Sort.Direction direction, String nameSearch);

    /**
     * getting recipe by id (with description)
     *
     * @param id - Recipe id
     *
     * @return RecipeModel
     */
    RecipeModel findById(Long id);

    /**
     * save new recipe, recipe description will also be saved
     *
     * @param recipe - RecipeModel to save
     *
     * @return id of saved recipe
     */
    Long saveNew(RecipeModel recipe);

    /**
     * update an existing recipe, recipe description will also be updated
     *
     * @param recipe - RecipeModel to save
     *
     * @return updated RecipeModel
     */
    RecipeModel update(RecipeModel recipe);

    /**
     * delete an existing recipe
     *
     * @param id - Recipe id
     */
    void delete(Long id);

}
