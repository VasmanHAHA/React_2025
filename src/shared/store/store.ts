import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { users } from '@/trash/mok-data/users';
import { countersReducer, } from './slices/counters.slice';
import {  usersReducer, UsersStoredAction } from './slices/users.slice';


// reducer под капотом
// const reducer = (state = initialState, action: Action): State => ({
//   users: usersReducer(state.users, action),
//   counters: countersReducer(state.counters, action),
// });


const reducer = combineReducers({
  counters: countersReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer,
});

store.dispatch({ type: 'usersStored', payload: { users } } satisfies UsersStoredAction);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useeAppStore = useStore.withTypes<typeof store>();
