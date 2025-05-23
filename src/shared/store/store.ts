import { combineReducers, configureStore} from '@reduxjs/toolkit';
import { countersReducer, } from './slices/counters.slice';
import { usersSlice } from './slices/users.slice';
import { extraArgument } from './extra-argument';
import { baseApi } from './api';


// reducer под капотом
// const reducer = (state = initialState, action: Action): State => ({
//   users: usersReducer(state.users, action),
//   counters: countersReducer(state.counters, action),
// });


const reducer = combineReducers({
  counters: countersReducer,
  [usersSlice.name]: usersSlice.reducer,
  [baseApi.reducerPath] : baseApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument}}).concat(baseApi.middleware),
});

