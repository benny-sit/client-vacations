import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CurrentUser } from "../../types";



type initValueType = {
    token: string,
    user: CurrentUser,
    isAdmin: boolean
}


const initialValue: initValueType = {
    token: '',
    isAdmin: false,
    user: null
}



const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token, isAdmin } = action.payload;
            state.user = user;
            state.token = token;
            state.isAdmin = isAdmin;
        },
        logOut: (state, action) => {
            state.isAdmin = false;
            state.user = null;
            state.token = '';
        },
        setToken: (state, action) => {
            const { token } = action.payload;
            state.token = token;
        }
    }
})


export const { setCredentials, logOut, setToken } = authSlice.actions;


export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin