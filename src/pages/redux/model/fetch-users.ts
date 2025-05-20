import { AppThunk } from '@/shared/store/redux';
import { usersSlice } from '@/shared/store/slices/users.slice';

// thunk in use
export const fetchUsers =
  ({refetch} : {refetch?: boolean}): AppThunk =>
  (dispatch, getState, { api }) => {
    const isIdle = usersSlice.selectors.selectFetchUsersIdle(getState());
    if (!isIdle && !refetch) {
      return;
    }
    dispatch(usersSlice.actions.fetchUsersPending());
    api
      .getUsers()
      .then((users) => {
        dispatch(usersSlice.actions.fetchUsersSuccess({ users }));
      })
      .catch(() => {
        dispatch(usersSlice.actions.fetchUsersFailed());
      });
  };
