import { configureStore, createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { User, UserId, users } from '@/trash/mok-data/users';

interface CounterState {
  counter: number;
}

export type CounterId = string;

export type CountersState = Record<CounterId, CounterState | undefined>;

export interface State {
  counters: CountersState;
  users: UsersState;
}

export interface IncrementAction {
  type: 'increment';
  payload: {
    counterId: CounterId;
  };
}

export interface DecrementAction {
  type: 'decrement';
  payload: {
    counterId: CounterId;
  };
}

export interface UserSelectedAction {
  type: 'userSelected';
  payload: {
    userId: UserId;
  };
}

export interface UserRemoveSelectedAction {
  type: 'userRemoveSelected';
}

export interface UsersStoredAction {
  type: 'usersStored';
  payload: {
    users: User[];
  };
}

export type Action =
  | IncrementAction
  | DecrementAction
  | UserSelectedAction
  | UserRemoveSelectedAction
  | UsersStoredAction;

const initialCounterState: CounterState = { counter: 0 };

const initialCountersState: CountersState = {};

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};
const initialState: State = {
  counters: {},
  users: initialUsersState,
};

interface UsersState {
  entities: Record<UserId, User | undefined>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
}

const reducer = (state = initialState, action: Action): State => ({
  users: usersReducer(state.users, action),
  counters: countersReducer(state.counters, action),
});

const countersReducer = (state = initialCountersState, action: Action) => {
  switch (action.type) {
    case 'increment': {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
          ...state,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 1,
          }
      };
    }
    case 'decrement': {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return  {
          ...state,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter - 1,
          },
        };
    }
    default:
      return state;
  }
};

const usersReducer = (state = initialUsersState, action: Action) => {
  switch (action.type) {
    case 'userSelected': {
      const { userId } = action.payload;
      return  {
          ...state,
          selectedUserId: userId,
        }
    }
    case 'userRemoveSelected': {
      return {
          ...state,
          selectedUserId: undefined,
        };
    }
    case 'usersStored': {
      const { users } = action.payload;
      return {
          ...state,
          entities: users.reduce((acc: Record<UserId, User | undefined>, user) => {
            acc[user.id] = user;
            return acc;
          }, {}),
          ids: users.map((user) => user.id),
          selectedUserId: users.find((user) => user.id === state.selectedUserId)?.id,
        };
    }
    default:
      return state;
  }
};

export const store = configureStore({
  reducer,
});

store.dispatch({ type: 'usersStored', payload: { users } } satisfies UsersStoredAction);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useeAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();

export const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];
export const selectUsers = (state: AppState) => state.users.entities;
export const selectSelectedUserId = (state: AppState) => state.users.selectedUserId;
