package com.techtask.domain.repo.specification;

import com.techtask.domain.Recipe;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class RecipeSpecifications {

    public static Specification<Recipe> nameLike(String name) {
        return (Root<Recipe> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (name.isEmpty()) {
                return cb.and();
            }
            return cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        };
    }

}
