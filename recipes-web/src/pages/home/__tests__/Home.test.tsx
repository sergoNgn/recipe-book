import { act, render, renderHook } from "@testing-library/react";
import Home from "../Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { mockRecipes } from "./__mocks__";
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

describe("Home Page", () => {
  it("renders home page", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockRecipes });

    const home = await act(async () => render(<Home />, { wrapper }));

    expect(home.container).toMatchSnapshot();
  });
});
