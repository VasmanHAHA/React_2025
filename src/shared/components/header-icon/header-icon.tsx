import { useMantineColorScheme, Image } from '@mantine/core';
import classes from './header-Icon.module.css'
import lightIcon from '@/assets/light.webp'
import darkIcon from '@/assets/dark.webp';

interface HeaderIconProps {
    className?: string;
}

const ICON_MAP = {
    light: lightIcon,
    dark: darkIcon,

  } as const;

export function HeaderIcon({className} : HeaderIconProps) {
    const { colorScheme } = useMantineColorScheme();

    const iconSrc = ICON_MAP[colorScheme as keyof typeof ICON_MAP] ?? ICON_MAP.light;

    return (
        <div className={`${classes.iconContainer} ${className}`}>
            <Image src={iconSrc} />
        </div>)
}