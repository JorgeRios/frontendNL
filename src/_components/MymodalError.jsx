import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MyModalError({
  children,
  showModal,
  handleClose,
  msgModalError,
}) {
  console.log("error aqui", msgModalError);
  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {msgModalError.response.status === 404 && (
          <Box sx={style}>
            <h2 style={{ textAlign: "center", color: "blue" }}>error 404</h2>
            <p style={{ textAlign: "center" }}>
              {msgModalError.response.data.message}
            </p>
          </Box>
        )}
      </Modal>
    </div>
  );
}
