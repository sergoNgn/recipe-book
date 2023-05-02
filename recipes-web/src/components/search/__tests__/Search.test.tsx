import { render } from "@testing-library/react";
import Search from "../Search";
import { Order } from "../../../types";

describe("Search", () => {
  it("renders search component", async () => {
    const alertDialog = render(
      <Search
        onAddClick={() => {}}
        onSearchValueChange={() => {}}
        onOrderChange={() => {}}
        order={Order.ASC}
      />
    );

    expect(alertDialog.baseElement).toMatchSnapshot();
  });
});
