import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeVacationModal,
  selectVacationModalState,
} from "../../features/modals/modalsSlice";
import ClearIcon from '@mui/icons-material/Clear';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function VacationsModal() {
  const open = useAppSelector(selectVacationModalState);
  const dispatch = useAppDispatch();
  console.log(open);

  function handleSubmit(event: any) {}

  return (
    <Modal
      open={open}
      onClose={() => dispatch(closeVacationModal({}))}
      aria-labelledby="vacations"
      aria-describedby="edit or create vacation"
    >
      <Box sx={style}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create New Vacation
        </Typography>
        <IconButton onClick={() => dispatch(closeVacationModal({}))}>
          <ClearIcon />
        </IconButton>
        </Box>
        <form onSubmit={handleSubmit}></form>
      </Box>
    </Modal>
  );
}
