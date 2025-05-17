import { combineReducers, configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { countersReducer, } from './slices/counters.slice';
import { usersSlice } from './slices/users.slice';
import { api } from '../api';


// reducer под капотом
// const reducer = (state = initialState, action: Action): State => ({
//   users: usersReducer(state.users, action),
//   counters: countersReducer(state.counters, action),
// });

const extraArgument = {
  api
}


const reducer = combineReducers({
  counters: countersReducer,
  [usersSlice.name]: usersSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument}}),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument,  UnknownAction>

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
