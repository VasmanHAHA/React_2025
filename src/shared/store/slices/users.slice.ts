import { User, UserId } from '@/trash/mok-data/users';
import { AppState, createAppSelector } from '../store';

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

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

interface UsersState {
  entities: Record<UserId, User | undefined>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
}



type Action =
  | UserSelectedAction
  | UserRemoveSelectedAction
  | UsersStoredAction;
export const usersReducer = (state = initialUsersState, action: Action) => {
  switch (action.type) {
    case 'userSelected': {
      const { userId } = action.payload;
      return {
        ...state,
        selectedUserId: userId,
      };
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

export const selectUsers = (state: AppState) => state.users.entities;
export const selectSelectedUserId = (state: AppState) => state.users.selectedUserId;

export const selectUserData = createAppSelector(
    (state: AppState) => state.users.entities,
    (_: AppState, id: UserId) => id,
    (entities, id) => entities[id] ?? { id: 'not found', name: 'error', description: 'not found' }
);

export const selectSortedUsers = createAppSelector(
  (state: AppState) => state.users.ids,
  (state: AppState) => state.users.entities,
  (_: AppState, sortType: "asc" | "desc") => sortType,
  (ids, entities, sortType) => ids.map(id => entities[id] ?? { id: 'not found', name: 'error', description: 'not found' })
      .sort((a, b) => {
          if (sortType === 'asc') {
              return a.name.localeCompare(b.name);
          } else {
              return b.name.localeCompare(a.name);
          }
      })
);