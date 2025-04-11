import { Button } from "@mantine/core";
import classes from './../classes.redux.page.module.css'

interface UserFiltersProps {
    setSortType: (sortType: "asc" | "desc") => void;
}

export function UserFilters(props: UserFiltersProps) {
    const { setSortType } = props;

    return (
    <div className={classes.userFilters}>
        <Button onClick={() => setSortType("asc")}>Sort Ascending</Button>
        <Button onClick={() => setSortType("desc")}>Sort Descending</Button>
    </div>
    )

}