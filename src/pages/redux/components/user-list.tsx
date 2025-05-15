import { useEffect, useState } from 'react';
import classes from './../classes.redux.page.module.css'
import { UserCard } from './user-card';
import { useAppSelector } from '@/shared/store/store';
import { UserFilters } from './user-filters';
import { usersSlice } from '@/shared/store/slices/users.slice';
import { api } from '@/shared/api';




export function UserList() {

    const [sortType, setSortType] = useState<"asc" | "desc">("asc");

    useEffect(()=> {
     api.getUsers().then(users => {
        console.log(users);
     });
    })

    const sortedUsers = useAppSelector((state)=> usersSlice.selectors.selectSortedUsers(state, sortType))

    return (
        <div className={classes.userList}>
            <h2 className={classes.userListTitle}>User List</h2>
            <UserFilters
                setSortType={setSortType}
            />
            <ul>
                {sortedUsers.map((user) => (
                    <UserCard key={user.id} userId={user.id} />
                ))}
            </ul>
        </div>
    )
}