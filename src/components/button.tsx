import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: 60px;
  width: 300px;
  border: 1px solid #BEBEBE;
  box-sizing: border-box;
  border-radius: 6px;
  padding-left: 16px;
  font-size: 24px;
  font-weight: bolder;
  color: ${props => !props.disabled ? "white" : "gainsboro"};
  margin: 1em;
  background-color: ${props => !props.disabled ? "#41aaff" : "gray"};
`;

type Props = {
    children: ReactNode,
    onClick: (e: React.MouseEvent<HTMLElement>) => void,
    disabled?: boolean
};

const PrimaryButton = (props: Props) => {
    const {
        children,
        onClick,
        disabled
    } = props;
    return (
        <Button onClick={onClick} disabled={disabled}>{children}</Button>
    );
};

export default PrimaryButton;