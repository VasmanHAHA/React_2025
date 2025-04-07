import { Link, useLocation } from 'react-router-dom';
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

    return (
        <nav className={classes.navBar}>
            {links.map(({ to, title, description }) =>
                <NavLink
                    key={to}
                    label={title}
                    description={description}
                    active={to === location}
                    variant="filled"
                    renderRoot={(props) => {
                        return <Link to={to}  {...props} />
                    }}
                />
            )}
        </nav>)
}