import { useMantineColorScheme, Image } from '@mantine/core';
import classes from './header-Icon.module.css'
import { MainLogo } from '@/assets/icons';

interface HeaderIconProps {
    className?: string;
}

const ICON_MAP = {
    dark: "var(--mantine-color-yellow-4)",
    light: "var(--mantine-color-blue-5)"
} as const;

export function HeaderIcon({ className }: HeaderIconProps) {
    const { colorScheme } = useMantineColorScheme();

    const iconColor = ICON_MAP[colorScheme as keyof typeof ICON_MAP] ?? ICON_MAP.light;

    return (
        <div className={`${classes.iconContainer} ${className}`}>
            <MainLogo
                style={{ width: '80px', height: '80px', padding: '10px' }}
                color={iconColor}
            />
        </div>)
}