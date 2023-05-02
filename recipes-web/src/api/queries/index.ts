import { useQuery, useMutation } from "react-query";
import { getRecipe, saveRecipe, deleteRecipe, getRecipes } from "../../api/api";
import { Pageable, Recipe } from "../../types";
import { Order } from "../../types/index";

export const useRecipesQuery = (
  page: number,
  order: Order,
  searchByName: string
) => {
  const {
    data: recipesPage,
    isLoading,
    isError,
  } = useQuery<Pageable<Recipe[]>>({
    queryKey: ["recipes", page, searchByName, order],
    queryFn: getRecipes,
  });

  return { recipesPage, isLoading, isError };
};

export const useRecipeQuery = (recipeId?: number) => {
  return useQuery<Recipe>({
    queryKey: ["recipe", recipeId],
    queryFn: getRecipe,
    enabled: !!recipeId,
  });
};

export const useRecipeSaveQuery = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: saveRecipe,
    onSuccess,
  });
};

export const useRecipeDeleteQuery = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess,
  });
};
