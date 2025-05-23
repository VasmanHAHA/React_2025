import { usersApi } from '@/pages/redux/users-api';
import { UserId } from '@/trash/mok-data/users';
import { AppThunk } from '../redux';

export const deleteUserThunk =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, _, { router }) => {

    await dispatch(usersApi.endpoints.deleteUser.initiate(userId));
    await router.navigate('/users');
    dispatch(usersApi.util.invalidateTags(['users']));
  };
