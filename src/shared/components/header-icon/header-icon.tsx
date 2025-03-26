import { useMantineColorScheme, Image } from '@mantine/core';
import classes from './header-Icon.module.css'
import lightIcon from '@/assets/light.webp'
import darkIcon from '@/assets/dark.webp';

interface HeaderIconProps {
    className?: string;
}

export function HeaderIcon({className} : HeaderIconProps) {
    const { colorScheme } = useMantineColorScheme();  // 'light' | 'dark'

    let iconSrc = lightIcon;

    switch (colorScheme) {
        case 'dark':
            iconSrc = darkIcon;
            break;
        case 'light':
            iconSrc = lightIcon;
            break;
    }


    return (
        <div className={`${classes.iconContainer} ${className}`}>
            <Image src={iconSrc} />
        </div>)
}