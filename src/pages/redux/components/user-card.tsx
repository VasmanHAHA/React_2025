import { User } from "@/trash/mok-data/users"
import classes from './../classes.redux.page.module.css'
import { selectSelectedUserId, useAppSelector, UserSelectedAction } from "@/shared/store/store";
import { useDispatch } from "react-redux";


interface UserCardProps {
    user: User;
}

export function UserCard(props: UserCardProps) {
    const { name, description, id } = props.user
    const dispatch = useDispatch();

    const selectedUser = useAppSelector((state) => selectSelectedUserId(state))
    const isSelected = selectedUser === id;

    return (
        <div
            className={`${classes.userCard} ${isSelected ? classes.selectedUserCard : ''
                }`}
            onClick={() => {
                dispatch({
                    type: 'userSelected',
                    payload: { userId: id },
                } satisfies UserSelectedAction);
            }}
        >
            <h2 className={classes.userCardTitle}>User Card id:{id}</h2>
            <p className={classes.userCardName}>User Name: {name}</p>
            <p className={classes.userCardDescription}>User Description: {description}</p>
        </div>
    )
}