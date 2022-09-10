import { FC } from "../../types/FC";

import * as Icons from "../../utils/Icons"

import { styled } from "../../../stiches.config";

interface objectType {
    [proporty: string]: any,
}

const Icon:FC<{name: string}> = ({ name }) => {
    const iconMap: objectType = {
        themeToggle: Icons.ThemeToggle,
    }
    const IconName: FC = iconMap[name];
    console.log(IconName)
    return (
        <IconName />
    );   
}

export default Icon;