import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { NavBar } from "@/components/NawBar/naw-bar";
import classes from './header.module.css'
import { routNames } from "@/config/routes";

export function Header() {
    return (<header className={classes.header}>
        <div>MyIcon</div>
        <NavBar links={[
            { to: routNames.home, title: 'домой' },
            { to: routNames.redux, title: 'Redux', description: 'Redux по курсу Паромова' },
            { to: routNames.mantine, title: 'Mantine', description:' Приветственная страница Mantine' },
        ]} />
        <ColorSchemeToggle />
    </header>)
}   