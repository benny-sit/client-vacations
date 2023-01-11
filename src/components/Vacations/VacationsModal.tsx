import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeVacationModal,
  selectVacationModalState,
} from "../../features/modals/modalsSlice";
import ClearIcon from '@mui/icons-material/Clear';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AuthAxios } from "../../services/api";
import { Vacation } from "../../types";
import { selectEditVacation, updateVacation } from "../../features/vacations/vacationsSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  width: '100%',
  p: 4,
};

const config = {     
  headers: { 'content-type': 'multipart/form-data' }
}

export default function VacationsModal() {
  const open = useAppSelector(selectVacationModalState);
  const editVacation = useAppSelector(selectEditVacation);
  const [err, setErr] = useState('');
  const dispatch = useAppDispatch();

  function handleSubmit(event: any) {
    // event.preventDefault();
    let formData = new FormData();
    
    const image = event.target.vacFile.files[0]

    console.log(image)

    if (!editVacation && !image) {
      return
    }

    if(image && image.size > 3000000) {
      return
    }
    
    formData.append('destination', event.target.destination.value)
    formData.append('description', event.target.description.value)
    formData.append('price', event.target.price.value)
    formData.append('startDate', event.target.startDate.value + "Z")
    formData.append('endDate', event.target.endDate.value + "Z")
    if (!editVacation || image) {
      formData.append('image', image, image.name)
    }

    if (!editVacation) {
      AuthAxios.post('/admin/vacations', formData, config)
        .then(response => {
          setErr('')
        })
        .catch(error => {
          setErr(error.response.data.error)
        })
    } else {
      AuthAxios.put(`/admin/vacations/${editVacation.id}`, formData, config)
       .then(response => {
          setErr('')
       })
       .catch(error => {
        setErr(error.response.data.error)
       })
    }
  }

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
          {!editVacation ? "Create New Vacation" : `Edit Vacation ( id: ${editVacation.id} )`}
        </Typography>
        <IconButton onClick={() => dispatch(closeVacationModal({}))}>
          <ClearIcon />
        </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth
            margin="dense"
            required 
            name="destination"
            label="Destination"
            defaultValue={editVacation && editVacation.destination}
            autoFocus
          />
          <TextField
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            defaultValue={editVacation && editVacation.description}
            margin="dense"
            required
            name="description"
            label="Description"
            id="description"
          />
        
          <TextField
            fullWidth
            id="price"
            defaultValue={editVacation ? editVacation.price: "0"}
            label="price"
            name="price"
            InputProps={{
              inputProps: { 
                min: 0 
              },
              startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
            type="number"
            margin="dense"
          />
          
          <TextField
            fullWidth
            id="startDate"
            name="startDate"
            label="Start Date"
            type="datetime-local"
            defaultValue={editVacation ? editVacation.startDate.substring(0, editVacation.startDate.length - 1 ) : "2023-01-01T00:00"}
            sx={{ my: 1}}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="endDate"
            name="endDate"
            label="End Date"
            type="datetime-local"
            defaultValue={editVacation ? editVacation.endDate.substring(0, editVacation.endDate.length - 1 ) : "2023-01-01T00:00"}
            sx={{ my: 1 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
          fullWidth
          variant="text"
          component="label"
          size="medium"
          sx={{
            my: 1,
            
          }}
          endIcon={<AddPhotoAlternateIcon />}
          >
          Upload
          <input
          type="file"
          name="vacFile"
          accept="image/*"
          hidden
          />
          </Button>
          <Button fullWidth type="submit" variant="contained">
            Submit
          </Button>
        </form>
        <Box sx={{
          color: 'red',
          mt: 1,
          textAlign: 'center',

        }}>
          {err}
        </Box>
      </Box>
    </Modal>
  );
}
