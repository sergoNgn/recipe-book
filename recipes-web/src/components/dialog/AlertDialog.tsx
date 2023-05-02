import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";
import { Box } from "@mui/material";

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  content: string;
  handleSubmit: () => void;
  handleClose: () => void;
}

const AlertDialog: FC<AlertDialogProps> = ({
  isOpen,
  title,
  content,
  handleSubmit,
  handleClose,
}) => {
  return (
    <Box>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleSubmit} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlertDialog;
