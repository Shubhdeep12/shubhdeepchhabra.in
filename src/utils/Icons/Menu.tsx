import { FC } from "../../types/FC";

type IconType = {
    width?: number,
    height?: number,
    color?: string
}

export const Menu: FC<IconType> = ({ width = 10, height = 10, color = "#212135", ...props }) => {

    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M3 12H21M3 6H21M3 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}