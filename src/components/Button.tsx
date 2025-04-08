import React from "react";

interface ButtonProps {
  children: string;
  className: string;
  onClick: () => void;
}

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
