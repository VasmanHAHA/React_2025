import { useState } from 'react';
import classes from './../classes.redux.page.module.css'
import { UserCard } from './user-card';
import { useAppSelector } from '@/shared/store/store';
import { UserFilters } from './user-filters';
import { selectSortedUsers } from '@/shared/store/slices/users.slice';




export function UserList() {

    const [sortType, setSortType] = useState<"asc" | "desc">("asc");
    const sortedUsers = useAppSelector((state)=> selectSortedUsers(state, sortType))

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