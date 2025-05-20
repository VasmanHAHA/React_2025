import { usersSlice } from "@/shared/store/slices/users.slice"
import { AppThunk } from "@/shared/store/store"
import { UserId } from "@/trash/mok-data/users"
import { fetchUsers } from "./fetch-users"

export const deleteUser = 
(userId: UserId): AppThunk<Promise<void>> => 
    async (dispatch, _, { api, router }) => {
        dispatch(usersSlice.actions.deleteUserPending())
        try {
            await api.deleteUserById(userId) // таким образом можно делать много await в том числе перед dispatch
            dispatch(usersSlice.actions.deleteUserSuccess({userId}))

            router.navigate("..", {relative: 'path'})
            dispatch(fetchUsers({refetch: true}))
        } catch (e) {
            dispatch(usersSlice.actions.deleteUserFailed())
        }
    }