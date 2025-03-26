import { Switch, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from '@/assets/icons/';

export function ThemeController() {

    const { setColorScheme, colorScheme } = useMantineColorScheme();

    const changeScheme = () => {
        setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
    }


    return (
        <>
            <Switch
                size="xl"
                checked={colorScheme === 'light'}
                onChange={() => { changeScheme() }}
                offLabel={<IconSun
                    style={{ width: '100%', height: '100%'}}
                    color="var(--mantine-color-yellow-4)" />}
                onLabel={<IconMoon
                    style={{ width: '100%', height: '100%' }}
                    color="var(--mantine-color-yellow-5)" />}
            />
        </>
    )
}