import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Pagination,
} from "@mui/material";
import { FC, useState, useEffect } from "react";
import RecipeComponent from "../../components/recipe/RecipeComponent";
import Search from "../../components/search/Search";
import { Order } from "../../types";
import RecipeModal from "../recipe/RecipeModal";
import { useRecipesQuery } from "../../api/queries";
import { ToastContainer, toast } from "react-toastify";

const Home: FC = () => {
  const [searchByName, setSearchByName] = useState("");
  const [order, setOrder] = useState(Order.ASC);
  const [page, setPage] = useState(1);

  const { recipesPage, isLoading, isError } = useRecipesQuery(
    page,
    order,
    searchByName
  );

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong. Please refresh te page.");
    }
  }, [isError]);

  const [currentRecipeId, setCurrentRecipeId] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onRecipeClick = (id: number | undefined) => {
    setCurrentRecipeId(id);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setCurrentRecipeId(undefined);
  };

  const onAddNewClick = () => {
    setIsModalOpen(true);
    setCurrentRecipeId(undefined);
  };

  const onPageChange = (event: any, page: number) => {
    setPage(page);
  };

  return (
    <Container>
      <ToastContainer />
      <RecipeModal
        onClose={onCloseModal}
        isOpen={isModalOpen}
        recipeId={currentRecipeId}
      />
      <Box
        className="w-full h-20 pt-3"
        style={{
          backgroundImage: "url(/images/background.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "20vh",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl font-bold text-white ml-2 select-none">
          Recipe Book
        </h1>
      </Box>
      <Box className="w-full mt-8 flex flex-col justify-center">
        <Search
          order={order}
          onOrderChange={(order) => {
            setOrder(order);
          }}
          onSearchValueChange={setSearchByName}
          onAddClick={onAddNewClick}
        />

        <Box className="flex flex-col align-ce">
          {isLoading ? (
            <CircularProgress className="absolute top-2/4 self-center" />
          ) : (
            <>
              <Box className="flex flex-wrap lg:xl:justify-start sm:justify-center gap-8 p-4 pl-4 pr-3 max-h-2/4 overflow-auto">
                {recipesPage?.content.length === 0 && (
                  <p className="mt-10 text-gray w-full text-center">
                    No Recipes ...
                  </p>
                )}
                {recipesPage?.content.map((recipe) => (
                  <RecipeComponent
                    key={recipe.id}
                    recipe={recipe}
                    onClick={onRecipeClick}
                  />
                ))}
              </Box>
              <Pagination
                hidden={recipesPage && recipesPage.totalPages < 2}
                count={recipesPage?.totalPages}
                page={page}
                onChange={onPageChange}
                color="primary"
                size="small"
                className="mt-5 self-center"
              />
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
