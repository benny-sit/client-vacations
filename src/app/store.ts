import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import vacationsReducer from '../features/vacations/vacationsSlice'
import modalsSlice from '../features/modals/modalsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vacations: vacationsReducer,
    modals: modalsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
