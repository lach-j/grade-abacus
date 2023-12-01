export type ThemeColor = 'primary' | 'secondary';
export type ButtonVariant = 'solid' | 'outline';
export type Size = 'sm' | 'md' | 'lg' | 'xl';

const colors = {
  primary: 'purple-600',
  secondary: 'red-600',
};

export const button = ({
  color = 'primary',
  size = 'md',
}: {
  color?: ThemeColor;
  variant?: ButtonVariant;
  size?: Size;
}) => {
  let px: number;
  let py: number;
  switch (size) {
    case 'sm':
      px = 2.5;
      py = 1;
      break;
    case 'md':
      px = 5;
      py = 2;
      break;
    case 'lg':
      px = 8;
      py = 3;
      break;
    case 'xl':
      px = 10;
      py = 4;
      break;
  }
  return {
    button: `py-${py} px-${px} rounded-lg text-white hover:opacity-70 transition-opacity bg-${colors[color]}`,
  };
};

export const header = {
  container: `fixed top-0 left-0 right-0 text-white h-14 flex items-center px-5 justify-between bg-${colors.primary}`,
};
