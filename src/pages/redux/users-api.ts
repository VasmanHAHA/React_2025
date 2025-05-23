import { baseApi } from "@/shared/store/api";
import { User, UserId } from "@/trash/mok-data/users";
import { z } from "zod";

const userDtoSchmena = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
});


export const usersApi = baseApi.injectEndpoints({
    endpoints:(create)=>({
        getUsers: create.query<User[], void>({
            query:()=>'/users',
            providesTags: ["users"],
            transformErrorResponse: (res: unknown) => userDtoSchmena.array().parse(res),
        }),
        getUser: create.query<User, UserId>({
            query:(userId)=>`/users/${userId}`,
            providesTags: ["users"],
            transformErrorResponse: (res: unknown) => userDtoSchmena.parse(res)
        }),
        deleteUser: create.mutation<void, UserId>({
            query:(userId)=>({method: "DELETE", url: `/users/${userId}`}),
            invalidatesTags: ["users"],
        }),
    }),
    overrideExisting: true,
})

export const {useGetUsersQuery} = usersApi;