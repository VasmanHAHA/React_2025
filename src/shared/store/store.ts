import { combineReducers, configureStore} from '@reduxjs/toolkit';
import { countersReducer, } from './slices/counters.slice';
import { usersSlice } from './slices/users.slice';
import { extraArgument } from './extra-argument';


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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument}}),
});

