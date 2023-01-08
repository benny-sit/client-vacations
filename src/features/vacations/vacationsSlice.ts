import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Vacation } from "../../types";


const fakeVac: Vacation = {
    id: 1,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem reiciendis distinctio asperiores doloribus, dolorum explicabo, quo deleniti optio dicta fugit, officiis neque magnam quam similique exercitationem dolore reprehenderit odit tempora.",
    destination: 'Brazil',
    startDate: new Date(2023, 1, 10),
    endDate: new Date(2023, 1, 15),
    price: 100,
    isFollowing: true,
  
    imageUrl: "https://i0.wp.com/www.touristisrael.com/wp-content/uploads/2012/08/shutterstock_101887351.jpg?resize=1024%2C683&ssl=1"
  }


const fakeVacations: Vacation[] = [fakeVac]

type initState = {
    vacations: Vacation[],
    numberPages: number,
    perPage: number,
    currentPage: number,
    isLoading: boolean,
}

const initialState: initState = {
    vacations: fakeVacations,
    numberPages: 10,
    perPage: 10,
    currentPage: 1,
    isLoading: true,
}

const vacationsSlice = createSlice({
    name: 'vacations',
    initialState: initialState,
    reducers: {
        setVacations: (state, action) => {
            state.vacations = action.payload.vacations;
        },
        setNumberPages: (state, action) => {
            state.numberPages = action.payload.numberPages;
        },
        toggleFollowing: (state, action) => {
            const { id } = action.payload;
            const vac = state.vacations.find(v => v.id === id)
            if(vac !== undefined) {
                vac.isFollowing = !vac?.isFollowing;
            }
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload.currentPage;
        },
    }
})

export const {setVacations, setNumberPages, toggleFollowing, setCurrentPage} = vacationsSlice.actions;

export default vacationsSlice.reducer;

export const selectNumberPages = (state: RootState) => state.vacations.numberPages;
export const selectVacations = (state: RootState) => state.vacations.vacations;
export const selectCurrentPage = (state: RootState) => state.vacations.currentPage;
export const selectPerPage = (state: RootState) => state.vacations.perPage;