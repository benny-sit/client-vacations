import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CurrentUser } from "../../types";


const initState = {
    vacationModal: false
}


const modalsSlice = createSlice({
    name: "modals",
    initialState: initState,
    reducers: {
        openVacationModal: (state, payload) => {
            state.vacationModal = true;
        },
        closeVacationModal: (state, payload) => {
            state.vacationModal = false;
        }
    }
})


export const { openVacationModal, closeVacationModal } = modalsSlice.actions;

export const selectVacationModalState = (state: RootState) => state.modals.vacationModal;

export default modalsSlice.reducer;