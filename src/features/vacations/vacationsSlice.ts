import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Vacation } from "../../types";


const fakeVac: Vacation = {
    id: 1,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem reiciendis distinctio asperiores doloribus, dolorum explicabo, quo deleniti optio dicta fugit, officiis neque magnam quam similique exercitationem dolore reprehenderit odit tempora.",
    destination: 'Brazil',
    startDate: '2023-01-10',
    endDate: '2023-01-15',
    price: 100,
    isFollowing: true,
  
    imageUrl: "https://i0.wp.com/www.touristisrael.com/wp-content/uploads/2012/08/shutterstock_101887351.jpg?resize=1024%2C683&ssl=1"
  }


const fakeVacations: Vacation[] = [fakeVac]

type initState = {
    vacations: Vacation[],
    myVacations: Vacation[],
    numberPages: number,
    perPage: number,
    currentPage: number,
    isLoading: boolean,
    editVacation?: Vacation,
    destinationFilter: string,
}

const initialState: initState = {
    vacations: [],
    myVacations: [],
    numberPages: 10,
    perPage: 10,
    currentPage: 1,
    isLoading: false,
    editVacation: undefined,
    destinationFilter: ""

}

const vacationsSlice = createSlice({
    name: 'vacations',
    initialState: initialState,
    reducers: {
        setMyVacations: (state, action) => {
            state.myVacations = action.payload.myVacations;
        },
        setVacations: (state, action) => {
            state.vacations = action.payload.vacations;
        },
        deleteVacation: (state, action) => {
            const { id } = action.payload;
            if (id) {
                state.vacations = state.vacations.filter(v => v.id !== id)
            }
        },
        toggleFollowing: (state, action) => {
            const { id } = action.payload;
            console.log("vac =",id);
            const vacIdx = state.vacations.findIndex(v => v.id === id);
            console.log("vacIdx =",vacIdx);
            if (vacIdx > -1) {
                state.vacations[vacIdx].isFollowing =!state.vacations[vacIdx].isFollowing;
            }

            if (state.vacations[vacIdx].isFollowing) {
                state.myVacations.push(state.vacations[vacIdx]);
            } else {
                state.myVacations = state.myVacations.filter(v => v.id !== id)
            }
        },
        setEditVacation: (state, action) => {
            state.editVacation = action.payload.editVacation;
        },
        updateVacation: (state, action) => {
            const { vacation } = action.payload;
            state.vacations = state.vacations.map(v => {
                if(v.id === vacation.id) {
                    return vacation;
                }
                return v;
            })
            if (vacation.isFollowing) {
                state.myVacations = state.myVacations.map(v => {
                    if(v.id === vacation.id) {
                        return vacation;
                    }
                    return v;
                })
            }
        },

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload.currentPage;
        },
        setNumberPages: (state, action) => {
            state.numberPages = action.payload.numberPages;
        },
        setVacationLoading: (state, action) => {

            state.isLoading = action.payload.isLoading;
        },
        setDestinationFilter: (state, action) => {
            state.destinationFilter = action.payload.destinationFilter;
        },
        setFilterMyVacations: (state, action) => {
            state.vacations = [...state.myVacations];
        }
    }
})

export const {setVacations, setNumberPages, toggleFollowing, setCurrentPage, deleteVacation, setEditVacation, setMyVacations, updateVacation, setVacationLoading, setDestinationFilter, setFilterMyVacations} = vacationsSlice.actions;

export default vacationsSlice.reducer;


export const selectDestinationFilter = (state: RootState ) => state.vacations.destinationFilter;
export const selectEditVacation = (state: RootState) => state.vacations.editVacation;
export const selectNumberPages = (state: RootState) => state.vacations.numberPages;
export const selectVacations = (state: RootState) => state.vacations.vacations;
export const selectCurrentPage = (state: RootState) => state.vacations.currentPage;
export const selectPerPage = (state: RootState) => state.vacations.perPage;
export const selectVacationsLoading = (state: RootState) => state.vacations.isLoading;