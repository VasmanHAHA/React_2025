import { useLocation, useNavigate } from 'react-router-dom';
import classes from './naw-bar.module.css';
import { NavLink } from "@mantine/core";

interface NavBarProps {
    links: {
        to: string,
        title: string,
        description?: string,
    }[]
}



export function NavBar(props: NavBarProps) {
    const { links } = props;
    const location = useLocation()?.pathname
    const navigate = useNavigate()

    return (
        <nav className={classes.navBar}>
            {links.map(({ to, title, description }) =>
                <NavLink
                    label={title}
                    onClick={()=> navigate(to)}
                    description={description}
                    active={to === location}
                    variant="filled"
                />
            )}
        </nav>)
}