import { ColorSchemeToggle } from "@/pages/mantine/components/color-scheme-toggle/ColorSchemeToggle";
import classes from './header.module.css'
import { routNames } from "@/config/routes";
import { NavBar } from "@/shared/components/naw-bar/naw-bar";
import { HeaderIcon } from "@/shared/components/header-icon/header-icon";

export function Header() {
    return (<header className={classes.header}>
        <HeaderIcon />
        <NavBar links={[
            { to: routNames.home, title: 'домой' },
            { to: routNames.redux, title: 'Redux', description: 'Redux по курсу Паромова' },
            { to: routNames.mantine, title: 'Mantine', description:' Приветственная страница Mantine' },
        ]} />
        <ColorSchemeToggle />
    </header>)
}   