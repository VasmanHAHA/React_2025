import { baseApi } from "@/shared/store/api";
import { User, UserId } from "@/trash/mok-data/users";

export const usersApi = baseApi.injectEndpoints({
    endpoints:(create)=>({
        getUsers: create.query<User[], void>({
            query:()=>'/users',
        }),
        getUser: create.query<User, UserId>({
            query:(userId)=>`/users/${userId}`,
        }),
    }),
    overrideExisting: true,
})

export const {useGetUsersQuery} = usersApi;