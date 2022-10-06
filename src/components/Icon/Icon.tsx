import { FC } from '../../types/FC';

import * as Icons from '../../utils/Icons';

interface objectType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [property: string]: any;
}

const Icon: FC<{ name: string; size: number; [property: string]: any; }> = ({ name, size = 10, ...props }) => {
  const iconMap: objectType = {
    themeToggle: Icons.ThemeToggle,
    menu: Icons.Menu,
    cross: Icons.Cross,
  };
  const IconName: FC = iconMap[name];

  return <IconName width={size} height={size} {...props} />;
};

export default Icon;
