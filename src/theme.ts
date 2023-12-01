export type ThemeColor = 'primary' | 'secondary';
export type ButtonVariant = 'solid' | 'outline';
export type Size = 'sm' | 'md' | 'lg' | 'xl';

const backgroundColors = {
  primary: 'bg-purple-600',
  secondary: 'bg-red-600',
};

export const button = ({
  color = 'primary',
  size = 'md',
}: {
  color?: ThemeColor;
  variant?: ButtonVariant;
  size?: Size;
}) => {
  let px: string;
  let py: string;
  switch (size) {
    case 'sm':
      px = 'px-2.5';
      py = 'py-1';
      break;
    case 'md':
      px = 'px-5';
      py = 'py-2';
      break;
    case 'lg':
      px = 'px-8';
      py = 'py-3';
      break;
    case 'xl':
      px = 'px-10';
      py = 'py-4';
      break;
  }
  return {
    button: `${py} ${px} rounded-lg text-white hover:opacity-70 transition-opacity ${backgroundColors[color]}`,
  };
};

export const header = {
  container: `fixed top-0 left-0 right-0 text-white h-14 flex items-center px-5 justify-between ${backgroundColors.primary}`,
};
