import { useDispatch } from 'react-redux';
import classes from './../classes.redux.page.module.css'
import { usersSlice } from '@/shared/store/slices/users.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mantine/core';
import { deleteUser } from '../model/delete-user';
import { useAppDispatch, useAppSelector } from '@/shared/store/redux';


interface UserPageProps {

}
export function UserPage(props: UserPageProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userId } = useParams()

    if (!userId) {
        return <p>Пользователь не найден</p>
    }

    const userData = useAppSelector((state) => usersSlice.selectors.selectUserData(state, userId))
    const { name, description, id } = userData;

    const selectedUserId = useAppSelector((state) => usersSlice.selectors.selectSelectedUserId(state));
    const isSelected = userId === selectedUserId;

    const selectUser = () => {
        dispatch(usersSlice.actions.selected({ userId }))
    }

    const removeUserSelection = () => {
        dispatch(usersSlice.actions.selectRemove());
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (isSelected) {
            removeUserSelection();
        } else {
            selectUser();
        }
    }

    const goBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigate("..", { relative: "path" })
    }

    const deleteCard = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
       const result = await dispatch(deleteUser(userId))
       // navigate может быть здесь
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
            <Button
                onClick={(e) => goBack(e)}
            >Назад</Button>
            <Button
                onClick={(e)=> deleteCard(e)}
                security='danger'
            >
                Удалить
            </Button>
        </div>
    )

}