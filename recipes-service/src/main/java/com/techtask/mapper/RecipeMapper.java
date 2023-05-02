package com.techtask.mapper;

import com.techtask.domain.Recipe;
import com.techtask.model.RecipeModel;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface RecipeMapper {

    @Mapping(target = "description", ignore = true)
    RecipeModel toRecipeModel(Recipe recipe);

    Recipe toRecipe(RecipeModel recipe);

    @Mapping(target = "id", ignore = true)
    void mergeRecipes(RecipeModel recipeModel, @MappingTarget Recipe recipe);

}
