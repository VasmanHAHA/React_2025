import { User, UserId } from "@/trash/mok-data/users";
import { z } from "zod";
import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = 'http://localhost:3000';

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes: ["users"],
    endpoints:()=>({}),
})


// api без reduxToolkit query

const userDtoSchmena = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
});


export const api = {
    getUsers: async () => {
        const response = await fetch(`${baseUrl}/users`);
        const data = await response.json() as User[];
        const users = userDtoSchmena.array().parse(data);
        return users;
    },
    getUserById: async (userId: UserId) => {
        const response = await fetch(`${baseUrl}/users/${userId}`);
        const data = await response.json() as User;
        const user = userDtoSchmena.parse(data);
        return user;
    },
    deleteUserById: async (userId: UserId) => {
        const response = await fetch(`${baseUrl}/users/${userId}`, {
            method: 'DELETE',
        });
        return response.json();
    },
}