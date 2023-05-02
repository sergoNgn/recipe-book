package com.techtask.service.impl;

import com.techtask.domain.repo.RecipesRepo;
import com.techtask.mapper.RecipeMapper;
import com.techtask.model.RecipeModel;
import com.techtask.service.RecipesService;
import com.techtask.service.exceptions.NoRecipeException;
import com.techtask.domain.repo.specification.RecipeSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RecipesServiceImpl implements RecipesService {

    private final RecipesRepo repo;
    private final RecipeMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public Page<RecipeModel> findAll(int page, int size, Sort.Direction direction, String nameSearch) {
        return repo.findAll(
                        RecipeSpecifications.nameLike(nameSearch),
                        PageRequest.of(page - 1, size, Sort.by(direction, "createdAt")))
                .map(mapper::toRecipeModel);
    }

    @Override
    @Transactional(readOnly = true)
    public RecipeModel findById(Long id) {
        return repo.findRecipe(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long saveNew(RecipeModel recipe) {
        var mappedRecipe = mapper.toRecipe(recipe);
        mappedRecipe.getDescription().setRecipe(mappedRecipe);
        var savedRecipe = repo.save(mappedRecipe);

        return savedRecipe.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public RecipeModel update(RecipeModel recipeModel) {
        var recipe = repo.findById(recipeModel.id()).orElseThrow(NoRecipeException::new);
        mapper.mergeRecipes(recipeModel, recipe);

        return recipeModel;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
