import { baseApi } from "@/shared/store/api";
import { User, UserId } from "@/trash/mok-data/users";

export const usersApi = baseApi.injectEndpoints({
    endpoints:(create)=>({
        getUsers: create.query<User[], void>({
            query:()=>'/users',
            providesTags: ["users"],
        }),
        getUser: create.query<User, UserId>({
            query:(userId)=>`/users/${userId}`,
            providesTags: ["users"],
        }),
        deleteUser: create.mutation<void, UserId>({
            query:(userId)=>({method: "DELETE", url: `/users/${userId}`}),
            invalidatesTags: ["users"],
        }),
    }),
    overrideExisting: true,
})

export const {useGetUsersQuery} = usersApi;