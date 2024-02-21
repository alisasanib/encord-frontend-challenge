import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position:
    "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform:
    "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (
    title: string,
    description: string
  ) => void;
}

export default function COnfirmationModal(
  props: ConfirmationModalProps
) {
  const [title, setTitle] =
    useState("");
  const [
    description,
    setDescription,
  ] = useState("");
  return (
    <Modal
      data-testid='confirmation-modal'
      open={props.visible}
      onClose={props.onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <TextField
          inputProps={{
            "data-testid":
              "confirmation-modal-title",
          }}
          required
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          id='outlined-required'
          label='Title'
        />
        <TextField
          inputProps={{
            "data-testid":
              "confirmation-modal-description",
          }}
          required
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          id='outlined-required'
          label='Description'
        />

        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent:
              "flex-end",
          }}>
          <Button
            variant='contained'
            color='error'
            onClick={() =>
              props.onClose()
            }>
            Cancel
          </Button>
          <Button
            data-testid='confirmation-modal-confirm-button'
            variant='contained'
            disabled={
              !title ||
              !description
            }
            onClick={() =>
              props.onConfirm(
                title,
                description
              )
            }>
            Confirm
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
