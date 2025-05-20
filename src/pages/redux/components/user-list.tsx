import {useState } from 'react';
import classes from './../classes.redux.page.module.css'
import { UserCard } from './user-card';
import { UserFilters } from './user-filters';
import { usersSlice } from '@/shared/store/slices/users.slice';
import {  useAppSelector} from '@/shared/store/redux';





export function UserList() {
    const [sortType, setSortType] = useState<"asc" | "desc">("asc");

    const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUsersPending);

    // перенесено в router
    // useEffect(() => {
    //     dispatch(fetchUsers({}))
    // }, [dispatch, appStore])

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