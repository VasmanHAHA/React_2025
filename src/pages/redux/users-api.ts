import { baseApi } from "@/shared/store/api";
import { User } from "@/trash/mok-data/users";

export const usersApi = baseApi.injectEndpoints({
    endpoints:(create)=>({
        getUsers: create.query<User[], void>({
            query:()=>'/users',
        })
    }),
    overrideExisting: true,
})

export const {useGetUsersQuery} = usersApi;