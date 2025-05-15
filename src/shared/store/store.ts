import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { countersReducer, } from './slices/counters.slice';
import { usersSlice } from './slices/users.slice';


// reducer под капотом
// const reducer = (state = initialState, action: Action): State => ({
//   users: usersReducer(state.users, action),
//   counters: countersReducer(state.counters, action),
// });


const reducer = combineReducers({
  counters: countersReducer,
  [usersSlice.name]: usersSlice.reducer,
});

export const store = configureStore({
  reducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
