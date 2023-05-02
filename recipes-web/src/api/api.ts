import axios from "axios";
import { Pageable, Recipe, RecipeDescription } from "../types";

interface RequestParams {
  queryKey: any;
}

export async function getRecipes(
  params: RequestParams
): Promise<Pageable<Recipe[]>> {
  const resp = await axios.get<Pageable<Recipe[]>>("/api/recipes", {
    params: {
      page: params.queryKey[1],
      size: 8,
      nameSearch: params.queryKey[2],
      direction: params.queryKey[3],
    },
  });

  return resp.data;
}

export async function getRecipe(params: RequestParams): Promise<Recipe> {
  const resp = await axios.get<Recipe>(`/api/recipes/${params.queryKey[1]}`);

  return resp.data;
}

export async function deleteRecipe(id: number): Promise<any> {
  return axios.delete(`/api/recipes/${id}`);
}

export async function saveRecipe(recipe: Recipe): Promise<number> {
  const method = recipe.id ? "PUT" : "POST";
  const resp = await axios.request<number>({
    method,
    url: "/api/recipes",
    data: recipe,
  });

  return resp.data;
}

export async function getRecipeDescription(
  params: RequestParams
): Promise<RecipeDescription> {
  const resp = await axios.get<RecipeDescription>(
    `/api/recipes/${params.queryKey[1]}/description`
  );

  return resp.data;
}
