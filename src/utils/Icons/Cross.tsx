import { FC } from "../../types/FC";

type IconType = {
    width?: number,
    height?: number,
    color?: string
}

export const Cross: FC<IconType> = ({ width = 10, height = 10, color = "#212135", ...props }) => {

    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
}