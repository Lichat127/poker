import { FC } from "react";

type ButtonProps = React.PropsWithChildren<{
  children?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  value?: string;
}>;

export const Button: FC<ButtonProps> = ({
  children,
  className = "px-6 py-3  bg-red-custom hover:bg-red-custom-dark transition-colors text-xl rounded-md",
  ...otherProps
}) => {
  return (
    <button className={className} {...otherProps}>
      {children}
    </button>
  );
};
