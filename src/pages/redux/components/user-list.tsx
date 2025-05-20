import { useEffect, useState } from 'react';
import classes from './../classes.redux.page.module.css'
import { UserCard } from './user-card';
import { useAppDispatch, useAppSelector, useAppStore } from '@/shared/store/store';
import { UserFilters } from './user-filters';
import { usersSlice } from '@/shared/store/slices/users.slice';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../model/fetch-users';




export function UserList() {
    const dispatch = useAppDispatch();
    const appStore = useAppStore();

    const [sortType, setSortType] = useState<"asc" | "desc">("asc");

    const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUsersPending);

    useEffect(() => {
        dispatch(fetchUsers({}))
    }, [dispatch, appStore])

    const sortedUsers = useAppSelector((state) => usersSlice.selectors.selectSortedUsers(state, sortType))

    if (isPending) {
        return <div>Loading...</div> 
    }

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