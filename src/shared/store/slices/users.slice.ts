import { createSelector, PayloadAction } from '@reduxjs/toolkit';
import { User, UserId } from '@/trash/mok-data/users';
import { fetchUsers } from '@/shared/store/thunk/fetch-users';
import { createSlice } from '../redux';

interface UsersState {
  entities: Record<UserId, User | undefined>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
  fetchUsersStatus: 'idle' | 'pending' | 'success' | 'failed';
  deleteUserStatus: 'idle' | 'pending' | 'success' | 'failed';
}

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
  fetchUsersStatus: 'idle',
  deleteUserStatus: 'idle',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers:  {
    selected(state, action: PayloadAction<{ userId: UserId }>) {
      state.selectedUserId = action.payload.userId;
    },
    selectRemove(state) {
      state.selectedUserId = undefined;
    },
    // goto extraReducers 
    //
    // fetchUsersPending(state) {
    //   state.fetchUsersStatus = 'pending';
    // },
    // fetchUsersSuccess(state, action: PayloadAction<{ users: User[] }>) {
    //   state.fetchUsersStatus = 'success';
    //   const users = action.payload.users;
    //   state.entities = users.reduce(
    //     (acc, user) => {
    //       acc[user.id] = user;
    //       return acc;
    //     },
    //     {} as Record<UserId, User>
    //   );
    //   state.ids = users.map((user) => user.id);
    // },
    // fetchUsersFailed(state) {
    //   state.fetchUsersStatus = 'failed';
    // },
    deleteUserPending(state) {
      state.deleteUserStatus = 'pending';
    },
    deleteUserSuccess(state, action: PayloadAction<{userId: UserId}>) {
      state.deleteUserStatus = 'success';
      delete state.entities[action.payload.userId]
      state.ids =  state.ids.filter((id) => id !== action.payload.userId)
    },
    deleteUserFailed(state) {
      state.deleteUserStatus = 'failed';
    },
  },
  extraReducers:builder => {
      builder.addCase(fetchUsers.pending, (state) => {
        state.fetchUsersStatus = 'pending';
      }),
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetchUsersStatus = 'success';
        const users = action.payload
        state.entities = users.reduce(
          (acc, user) => {
            acc[user.id] = user;
            return acc;
          },
          {} as Record<UserId, User>
        );
        state.ids = users.map((user) => user.id);
      }),
      builder.addCase(fetchUsers.rejected, (state) => {
        state.fetchUsersStatus = 'failed';
      })
  },
  selectors: {
    selectSelectedUserId: (state) => state.selectedUserId,
    selectUsers: (state) => state.entities,
    selectSortedUsers: createSelector(
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
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === 'pending',
    selectFetchUsersIdle: (state) => state.fetchUsersStatus === 'idle',
    selectIsDeleteUserPending: (state) => state.deleteUserStatus === 'pending',
  },
});


// вариант createAsyncThunk внутри слайса

// reducers: (creator) => ({

// create reducer
// creator.reducer( selected(state, action: PayloadAction<{ userId: UserId }>) {
//   state.selectedUserId = action.payload.userId;
// }),

//   //create async thunk
//   fetchUser: creator.asyncThunk<User, { userId: UserId }, { extra: ExtraArgument }>(
//     (params, thunkAPI) => {
//       return thunkAPI.extra.api.getUserById(params.userId);
//     },
//     {
//       pending: (state) => {
//         state.fetchUserStatus = 'pending';
//       },
//       fulfilled: (state, action) => {
//         const user = action.payload;
//         state.fetchUserStatus = 'success';
//         state.entities[user.id] = user;
//       },
//       rejected: (state) => {
//         state.fetchUserStatus = 'failed';
//       },
//     }
//   ),
// 
// }),