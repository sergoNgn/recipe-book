package com.techtask.model;

public record RecipeModel(
        Long id,
        String name,
        String shortDescription,
        RecipeDescriptionModel description
) {
}
