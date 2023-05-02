import { act, render, waitFor } from "@testing-library/react";
import RecipeModal from "../RecipeModal";
import { QueryClient, QueryClientProvider } from "react-query";
import { mockRecipe } from "./__mocks__";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.clearAllMocks();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Recipe Modal", () => {
  it("renders recipe modal", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockRecipe });

    const modal = await act(async () =>
      render(<RecipeModal recipeId={1} onClose={() => {}} isOpen={true} />, {
        wrapper,
      })
    );

    expect(modal.baseElement).toMatchSnapshot();
  });
});
