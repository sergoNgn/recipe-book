import { render } from "@testing-library/react";
import RecipeComponent from "../RecipeComponent";
import { recipe } from "./__mocks__";

describe("Recipe Component", () => {
  it("renders recipe component", async () => {
    const recipeComponent = render(
      <RecipeComponent recipe={recipe} onClick={() => {}} />
    );

    expect(recipeComponent.baseElement).toMatchSnapshot();
  });
});
