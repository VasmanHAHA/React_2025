import { usersSlice } from '@/shared/store/slices/users.slice';
import classes from './../classes.redux.page.module.css'
import { UserId } from '@/trash/mok-data/users';
import { memo } from 'react';
import { useDispatch } from "react-redux";
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/store/redux';


interface UserCardProps {
    userId: UserId;
}




export const UserCard = memo(function UserCard({ userId }: UserCardProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const selectCard = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isSelected) {
            removeUserSelection();
        } else {
            selectUser();
        }
    }

   const gotoCard = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigate(userId)
   }
 

    return (
        <div
            className={`${classes.userCard} ${isSelected ? classes.selectedUserCard : ''
                }`}
            onClick={selectCard}
        >
            <h2 className={classes.userCardTitle}>User Card id:{id}</h2>
            <p className={classes.userCardName}>User Name: {name}</p>
            <p className={classes.userCardDescription}>User Description: {description}</p>
            <Button
                onClick={(e) =>gotoCard(e)}
            >Подробнее</Button>
        </div>
    )
})