import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserId } from '@/trash/mok-data/users';

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

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers: {
    selected(state, action: PayloadAction<{ userId: UserId }>) {
      state.selectedUserId = action.payload.userId;
    },
    selectRemove(state) {
      state.selectedUserId = undefined;
    },
    stored(state, action: PayloadAction<{ users: User[] }>) {
      const users = action.payload.users;
      state.entities = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, User>);
      state.ids = users.map((user) => user.id);
    },
  },
  selectors: {
    selectSelectedUserId: (state) => state.selectedUserId,
    selectUsers: (state) => state.entities,
    selectSortedUsers:  createSelector(
      (state: UsersState) => state.ids,
      (state: UsersState) => state.entities,
      (_: UsersState, sortType: 'asc' | 'desc') => sortType,
      (ids, entities, sortType) =>
        ids
          .map((id) => entities[id] ?? { id: 'not found', name: 'error', description: 'not found' })
          .sort((a, b) => {
            if (sortType === 'asc') {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          })
    ),
    selectUserData: createSelector(
      (state: UsersState) => state.entities,
      (_: UsersState, id: UserId) => id,
      (entities, id) => entities[id] ?? { id: 'not found', name: 'error', description: 'not found' }
    ),
  }
});
