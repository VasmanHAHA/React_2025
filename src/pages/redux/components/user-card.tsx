import { usersSlice } from '@/shared/store/slices/users.slice';
import classes from './../classes.redux.page.module.css'
import { useAppSelector} from "@/shared/store/store";
import { UserId } from '@/trash/mok-data/users';
import { memo } from 'react';
import { useDispatch } from "react-redux";


interface UserCardProps {
    userId: UserId;
}




export const UserCard = memo(function UserCard({ userId }: UserCardProps) {
    const dispatch = useDispatch();

    const userData = useAppSelector((state) => usersSlice.selectors.selectUserData(state, userId))
    const { name, description, id } = userData;

    const selectedUserId = useAppSelector((state) => usersSlice.selectors.selectSelectedUserId(state));
    const isSelected = userId === selectedUserId;

    const selectUser = () => {
        dispatch(usersSlice.actions.selected({ userId }))
    }

    const removeUserSelection = () => {
        dispatch( usersSlice.actions.selectRemove());
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (isSelected) {
            removeUserSelection();
        } else {
            selectUser();
        }
    }
    return (
        <div
            className={`${classes.userCard} ${isSelected ? classes.selectedUserCard : ''
                }`}
            onClick={handleClick}
        >
            <h2 className={classes.userCardTitle}>User Card id:{id}</h2>
            <p className={classes.userCardName}>User Name: {name}</p>
            <p className={classes.userCardDescription}>User Description: {description}</p>
        </div>
    )
})