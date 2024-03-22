import { css } from "@emotion/react";
import styled from "@emotion/styled";

type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  children: string;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "medium",
  disabled = false,
  onClick,
}) => {
  return (
    <ButtonBlock size={size} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonBlock>
  );
};

const ButtonBlock = styled.button<{
  size: ButtonSize;
}>`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.8em 1.2em;
  font-size: 1rem;
  font-weight: 100;
  font-family: inherit;
  background-color: #4d4d4d;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #969696;
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto black;
  }
  ${(props) =>
    props.disabled === true &&
    css`
      pointer-events: none;
      background-color: #a7a7a7;
      &:hover {
        background-color: #a7a7a7;
      }
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      width: 200px;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      width: 400px;
    `}
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 0.8rem;
      width: 105px;
      padding: 5px;
    `}
`;

export default Button;
