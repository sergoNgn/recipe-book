package com.techtask.domain.repo;

import com.techtask.domain.Recipe;
import com.techtask.model.RecipeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface RecipesRepo extends JpaRepository<Recipe, Long>, JpaSpecificationExecutor<Recipe> {

    @Query("""
               select new com.techtask.model.RecipeModel(
                   r.id,
                   r.name,
                   r.shortDescription,
                   new com.techtask.model.RecipeDescriptionModel (
                       rd.id,
                       rd.data
                   )
               ) from Recipe r inner join r.description rd where r.id = ?1
            """)
    RecipeModel findRecipe(Long id);

}
