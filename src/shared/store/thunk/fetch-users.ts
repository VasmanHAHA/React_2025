import { createAppAsyncThunk } from '@/shared/store/redux';
import { usersSlice } from '@/shared/store/slices/users.slice';

// thunk in use
// export const fetchUsers =
//   ({refetch} : {refetch?: boolean} = {}): AppThunk =>
//   (dispatch, getState, { api }) => {
//     const isIdle = usersSlice.selectors.selectFetchUsersIdle(getState());
//     if (!isIdle && !refetch) {
//       return;
//     }
//     dispatch(usersSlice.actions.fetchUsersPending());
//     api
//       .getUsers()
//       .then((users) => {
//         dispatch(usersSlice.actions.fetchUsersSuccess({ users }));
//       })
//       .catch(() => {
//         dispatch(usersSlice.actions.fetchUsersFailed());
//       });
//   };

export const fetchUsers = createAppAsyncThunk(
  'users/fetchUsers',
  async (_ : { refetch?: boolean } = {}, thunkAPI) => {
    return thunkAPI.extra.api.getUsers();
  }, 
  {
    condition(params, {getState}) {
      const isIdle = usersSlice.selectors.selectFetchUsersIdle(getState());
      return !(!params.refetch && !isIdle) 
      // if (!params.refetch && isIdle) {
      //   return false
      // }
      // return true
    }
  }
);
