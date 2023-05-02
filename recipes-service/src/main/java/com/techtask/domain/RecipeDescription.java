package com.techtask.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "recipe_descriptions")
@Getter
@Setter
public class RecipeDescription {

    @Id
    private Long id;

    @Column(name = "data", nullable = false)
    private String data;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private Recipe recipe;

}
