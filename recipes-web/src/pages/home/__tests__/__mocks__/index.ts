import { Recipe } from "../../../../types";
import { Pageable } from "../../../../types/index";

export const mockRecipes: Pageable<Recipe[]> = {
  content: [
    {
      id: 1,
      name: "recipe #1",
      shortDescription: "short description",
      description: { id: 1, data: "description" },
    },
    {
      id: 2,
      name: "recipe #2",
      shortDescription: "short description",
      description: { id: 1, data: "description" },
    },
    {
      id: 3,
      name: "recipe #2",
      shortDescription: "short description",
      description: { id: 1, data: "description" },
    },
  ],
  totalElements: 3,
  totalPages: 1,
};
