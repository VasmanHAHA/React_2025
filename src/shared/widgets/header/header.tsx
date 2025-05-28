import classes from './header.module.css'
import { routNames } from "@/config/routes";
import { NavBar } from "@/shared/components/naw-bar/naw-bar";
import { HeaderIcon } from "@/shared/components/header-icon/header-icon";
import { ThemeController } from "@/shared/components/theme-controller/theme-controller";

export function Header() {
    return (
        <header className={classes.header}>
            <HeaderIcon />
            <NavBar links={[
                { to: routNames.home, title: 'домой' },
                {to: routNames.tests, title:'Тесты', description: 'Тестирую работу незнакомых библиотек и подходов'},
                { to: routNames.redux, title: 'Redux', description: 'Redux base exploring' },
                { to: routNames.mantine, title: 'Mantine', description: ' Приветственная страница Mantine' },
            ]} />
            <ThemeController />
        </header>
    )
}   