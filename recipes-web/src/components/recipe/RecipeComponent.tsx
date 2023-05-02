import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FC } from "react";
import { Recipe } from "../../types";

interface RecipeComponentProps {
  recipe: Recipe;
  onClick: (recipeId: number | undefined) => void;
}

const RecipeComponent: FC<RecipeComponentProps> = ({ onClick, recipe }) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg h-54 sm:w-full md:w-2/5 xl:w-64"
      onClick={() => onClick(recipe.id)}
    >
      <CardMedia
        component="img"
        sx={{ height: 80 }}
        image="/images/recipe.jpg"
        alt="recipe image"
      />
      <CardContent className="select-none">
        <Typography
          gutterBottom
          variant="subtitle1"
          className="truncate"
          component="div"
          title={recipe.name}
        >
          {recipe.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.shortDescription}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeComponent;
