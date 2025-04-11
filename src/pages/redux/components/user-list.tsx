import { useState } from 'react';
import  classes from './../classes.redux.page.module.css'
import { UserCard } from './user-card';
import { selectSelectedUserId, selectUsers, useAppDispatch, useAppSelector } from '@/shared/store/store';
import { UserFilters } from './user-filters';


export function UserList() {
    const dispatch = useAppDispatch();

    const [sortType, setSortType] = useState<"asc" | "desc">("asc");


    const ids = useAppSelector((state) => state.users.ids);
    const entities = useAppSelector((state) => selectUsers(state));
    // const selectedUserId = useAppSelector((state) => selectSelectedUserId(state))
    // const selectedUset = selectedUserId ? entities[selectedUserId] : undefined;

    const sortedUsers = ids.map(id => entities[id] ?? {    id: 'not found', name: 'error', description: 'not found' })
    .sort((a, b) =>{
        if (sortType === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    return (
        <div className={classes.userList}>
            <h2 className={classes.userListTitle}>User List</h2>
            <UserFilters 
                setSortType={setSortType}
            />
            <ul>
                {sortedUsers.map((user) => (
                        <UserCard key={user?.id} user={user} />
                ))}
            </ul>
        </div>
    )
}