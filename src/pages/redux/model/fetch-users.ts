import { usersSlice } from '@/shared/store/slices/users.slice';
import { AppThunk } from '@/shared/store/store';

// thunk in use
export const fetchUsers = (): AppThunk => (dispatch, getState, {api}) => {
  const isIdle = usersSlice.selectors.selectFetchUsersIdle(getState());
  if (!isIdle) {
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
