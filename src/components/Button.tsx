import { ButtonVariant, Size, ThemeColor, button } from '../theme';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  color?: ThemeColor;
  icon?: React.ReactNode;
  size?: Size;
}

const Button = ({
  children,
  onClick = () => {},
  variant = 'solid',
  color = 'primary',
  size = 'md',
  icon,
}: ButtonProps) => {
  const styles = button({ color, variant, size });

  return (
    <button className={`${styles.button} flex items-center gap-2`} onClick={() => onClick()}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
