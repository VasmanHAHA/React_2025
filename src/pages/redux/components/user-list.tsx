import { useState } from 'react';
import classes from './../classes.redux.page.module.css'
import { UserCard } from './user-card';
import { AppState, createAppSelector, useAppSelector } from '@/shared/store/store';
import { UserFilters } from './user-filters';


const selectSortedUsers = createAppSelector(
    (state: AppState) => state.users.ids,
    (state: AppState) => state.users.entities,
    (state: AppState, sortType: "asc" | "desc") => sortType,
    (ids, entities, sortType) => ids.map(id => entities[id] ?? { id: 'not found', name: 'error', description: 'not found' })
        .sort((a, b) => {
            if (sortType === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        })
);

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