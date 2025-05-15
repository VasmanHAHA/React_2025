import { api } from '@/shared/api';
import { usersSlice } from '@/shared/store/slices/users.slice';
import { AppDispatch, AppState } from '@/shared/store/store';

export const fetchUsers = (dispatch: AppDispatch, getState: () => AppState) => {
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
