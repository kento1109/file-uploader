import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
    onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

const LabelStyle = styled.label`
  height: 50px;
  width: 300px;
  cursor: pointer;
  border: 1px solid #BEBEBE;
  box-sizing: border-box;
  border-radius: 6px;
  padding-left: 16px;
  font-size: 22px;
  color: white;
  margin: 1em;
  background-color: #41aaff;
`;

const Control = styled.div`
  display: flex;
  justify-content: center;
  vertical-align: middle;
  text-align: center; 
`;

const InputFileStyle = styled.input`
  height: 80px;
  width: 30%;
  display: none;
`;

const InputFile = (props: Props) => {
    const {
        onFileInputChange
    } = props;
    return (
        <>
            <Control>
                <LabelStyle>
                    <InputFileStyle type='file' onChange={onFileInputChange} />ファイルを選択して下さい
                </LabelStyle>
            </Control>
        </>
    );
};

export default InputFile;