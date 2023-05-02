import { FC, useState } from "react";
import { useQueryClient } from "react-query";
import { Modal, Box, TextField, Button } from "@mui/material";
import { notEmpty, maxLength } from "../../validators";
import AlertDialog from "../../components/dialog/AlertDialog";
import { useInput } from "../../hooks/useInput";
import "./RecipeModal.css";
import {
  useRecipeQuery,
  useRecipeSaveQuery,
  useRecipeDeleteQuery,
} from "../../api/queries";

interface RecipeModalProps {
  recipeId: number | undefined;
  onClose: () => void;
  isOpen: boolean;
}

const RecipeModal: FC<RecipeModalProps> = ({ isOpen, onClose, recipeId }) => {
  const queryClient = useQueryClient();
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const { data: recipe } = useRecipeQuery(recipeId);

  const saveRecipeMutation = useRecipeSaveQuery(() => {
    onCloseModal();
    queryClient.invalidateQueries("recipes");
  });

  const deleteRecipeMutation = useRecipeDeleteQuery(() => {
    setAlertDialogOpen(false);
    onCloseModal();
    queryClient.invalidateQueries("recipes");
  });

  const name = useInput(recipe?.name ?? "", [notEmpty()]);
  const shortDescription = useInput(recipe?.shortDescription ?? "", [
    notEmpty(),
    maxLength(150),
  ]);
  const description = useInput(recipe?.description?.data ?? "", [
    notEmpty(),
    maxLength(1000),
  ]);

  const onCloseModal = () => {
    name.reset();
    shortDescription.reset();
    description.reset();
    onClose();
  };

  const canSave = (): boolean => {
    return (
      (name.isDirty || shortDescription.isDirty || description.isDirty) &&
      !(name.isError || shortDescription.isError || description.isError)
    );
  };

  const onSaveRecipe = () => {
    if (canSave()) {
      saveRecipeMutation.mutate({
        ...recipe,
        name: name.value,
        shortDescription: shortDescription.value,
        description: { ...recipe?.description, data: description.value },
      });
    }
  };

  const submitDelete = () => {
    if (recipeId) {
      deleteRecipeMutation.mutate(recipeId);
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={alertDialogOpen}
        handleClose={() => setAlertDialogOpen(false)}
        handleSubmit={submitDelete}
        title="Delete this Recipe?"
        content="Are you shure you want to delete this Recipe?"
      />
      <Modal open={isOpen} onClose={onCloseModal}>
        <Box className="recipe-modal">
          <TextField
            size="small"
            fullWidth
            required
            label="Name"
            margin="normal"
            autoComplete="off"
            error={name.isDirty && name.isError}
            helperText={name.errorText}
            value={name.value}
            onBlur={name.onBlur}
            onChange={name.onChange}
          >
            {name.value}
          </TextField>
          <TextField
            size="small"
            fullWidth
            required
            label="Short Description"
            multiline
            maxRows={4}
            margin="normal"
            autoComplete="off"
            error={shortDescription.isDirty && shortDescription.isError}
            helperText={shortDescription.errorText}
            value={shortDescription.value}
            onBlur={shortDescription.onBlur}
            onChange={shortDescription.onChange}
          >
            {shortDescription.value}
          </TextField>
          <TextField
            fullWidth
            required
            label="Recipe"
            multiline
            minRows={10}
            maxRows={20}
            margin="normal"
            autoComplete="off"
            error={description.isDirty && description.isError}
            helperText={description.errorText}
            value={description.value}
            onBlur={description.onBlur}
            onChange={description.onChange}
          >
            {description.value}
          </TextField>
          <Box className="flex flex-row gap-5 mt-4">
            <Button
              disabled={!canSave()}
              variant="contained"
              className="w-3/12"
              size="small"
              onClick={onSaveRecipe}
            >
              Save
            </Button>
            {recipe?.id && (
              <Button
                onClick={() => setAlertDialogOpen(true)}
                className="w-3/12"
                variant="outlined"
                color="error"
                size="small"
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RecipeModal;
