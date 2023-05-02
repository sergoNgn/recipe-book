import { render } from "@testing-library/react";
import AlertDialog from "../AlertDialog";

describe("Alert Dialog", () => {
  it("renders alert dialog", async () => {
    const alertDialog = render(
      <AlertDialog
        isOpen={true}
        title={"some title"}
        content={"dialog content ..."}
        handleSubmit={() => {}}
        handleClose={() => {}}
      />
    );

    expect(alertDialog.baseElement).toMatchSnapshot();
  });
});
