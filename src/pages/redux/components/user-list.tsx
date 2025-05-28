import {useMemo, useState } from 'react';
import classes from './../classes.redux.page.module.css'
import { UserCard } from './user-card';
import { UserFilters } from './user-filters';
import { usersSlice } from '@/shared/store/slices/users.slice';
import {  useAppSelector} from '@/shared/store/redux';
import { usersApi } from '../users-api';





export function UserList() {
    const [sortType, setSortType] = useState<"asc" | "desc">("asc");

   // работа без rtk query

    // const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUsersPending);

    // const sortedUsers = useAppSelector((state) => usersSlice.selectors.selectSortedUsers(state, sortType))

    // перенесено в router
    // useEffect(() => {
    //     dispatch(fetchUsers({}))
    // }, [dispatch, appStore])

    
    // selectSortedUsers: createSelector(
    //     (state: UsersState) => state.ids,
    //     (state: UsersState) => state.entities,
    //     (_: UsersState, sortType: 'asc' | 'desc') => sortType,
    //     (ids, entities, sortType) =>
    //       ids
    //         .map((id) => entities[id] ?? { id: 'not found', name: 'error', description: 'not found' })
    //         .sort((a, b) => {
    //           if (sortType === 'asc') {
    //             return a.name.localeCompare(b.name);
    //           } else {
    //             return b.name.localeCompare(a.name);
    //           }
    //         })
    //   ),
    
   const {data: users, isLoading } = usersApi.useGetUsersQuery();
   
    const sortedUsers = useMemo(()=> {
        if (!users) return [];
        console.log(users);

        const sortedUsers = [...users].sort((a, b) => {
            if (sortType === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        })
        return sortedUsers;
    }, [users, sortType]);

    if (isLoading) {
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
                    <UserCard key={user.id} userId={user.id} user={user} />
                ))}
            </ul>
        </div>
    )
}