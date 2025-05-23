import { useDispatch } from 'react-redux';
import classes from './../classes.redux.page.module.css'
import { usersSlice } from '@/shared/store/slices/users.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mantine/core';
import { deleteUser } from '../model/delete-user';
import { useAppDispatch, useAppSelector } from '@/shared/store/redux';
import { usersApi } from '../users-api';
import { skipToken } from '@reduxjs/toolkit/query';


interface UserPageProps {

}
export function UserPage(props: UserPageProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userId } = useParams()

    if (!userId) {
        return <p>Пользователь не найден</p>
    }


    const { data: user, isLoading } = usersApi.useGetUserQuery(userId ?? skipToken); // skipToken если userId не нужен
    // но лучше хук вообще не вызывать
    const [deleteUser, { isLoading: isLoadingDelete, error }] = usersApi.useDeleteUserMutation();


    // const userData = useAppSelector((state) => usersSlice.selectors.selectUserData(state, userId))

    if (!user) {
        return <p>Пользователь не найден</p>
    }
    const { name, description, id } = user;

    const goBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigate("..", { relative: "path" })
    }


    const deleteCard = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        //    const result = await dispatch(deleteUser(userId))
        // navigate может быть здесь
        deleteUser(userId);
    }
    return (
        <div className={`${classes.userCard}`}>
            <h2 className={classes.userCardTitle}>User Card id:{id}</h2>
            <p className={classes.userCardName}>User Name: {name}</p>
            <p className={classes.userCardDescription}>User Description: {description}</p>
            <Button
                onClick={(e) => goBack(e)}
            >Назад</Button>
            <Button
                onClick={(e) => deleteCard(e)}
                security='danger'
            >
                Удалить
            </Button>
        </div>
    )

}