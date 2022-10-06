import { styled } from '../../../stiches.config';
import { FC } from '../../types/FC';

type Text = {
  [x:string] : any
}
const Text: FC<Text> = ({ children, size="a", ...props }) => {
  return <StyledText size={size} {...props}>{children}</StyledText>;
};

export default Text;

const StyledText = styled('div', {
  variants: {
    size: {
      sm: {
        fontSize: '$1',
      },
      med: {
        fontSize: '$2',
      },
      lar: {
        fontSize: '$3',
      },
    },
  },
});
