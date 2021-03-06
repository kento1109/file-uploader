import React, { useState } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';


import PrimaryButton from './components/button'
import InputFile from './components/inputFile'
import { Item } from './types'

const axios = require("axios");

const Control = styled.div`
  display: flex;
  justify-content: center;
  vertical-align: middle;
  margin: 16px 0;
  width: 100%;
`;

const LabelStyle = styled.label<{ isFileSelected: boolean }>`
  margin: 1em;
  display: ${props => props.isFileSelected ? "flex" : "none"};
`;


function App() {
  const [stateFile, setFile] = useState<File>();
  const [stateFilename, setFilename] = useState<string>("");
  const [stateFileSelected, setFileSelected] = useState(false);
  const [stateItems, setItems] = useState<Item[]>([]);
  const [stateSalary, setSalary] = useState<number>(0);

  const FileInputChengeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if ((e.target.files != null) && (e.target.files.length > 0)) {
      const file: File = e.target.files[0]
      setFile(file);
      setFilename(e.target.files[0].name);
      setFileSelected(true);
    } else {
      // setFile(null);
      setFilename("");
      setFileSelected(false);
    }
  };

  const UploadFile = () => {

    if (stateFile !== undefined) {

      const formData = new FormData();
      formData.append("file", stateFile);

      axios
        .post("https://extract-text-backend.herokuapp.com/upload", formData)
        // .post("http://127.0.0.1:8000/upload", formData)
        .then((response) => {
          console.log("File Upload success");
          setItems(response.data.freq_items);
          setSalary(response.data.estimated_salary);
        })
        .catch((error) => alert("File Upload Error"));

    }

  };

  // data.sort((a: Item, b: Item) => b.uv - a.uv);

  return (
    <>
      <Control>
        <InputFile onFileInputChange={(e) => FileInputChengeHandler(e)} />
      </Control>
      <Control>
        <LabelStyle isFileSelected={stateFileSelected}>{stateFilename}</LabelStyle>
      </Control>
      <Control>
        <PrimaryButton onClick={() => (UploadFile())} disabled={stateFile === undefined}>
          ??????????????????
        </PrimaryButton>
      </Control>
      <Control>
        <h2>???????????????{stateSalary} ??????</h2>
      </Control>
      <Control>
        <h3>??????????????????????????????</h3>
      </Control>
      <Control>
        {stateItems.length > 0 &&
          <BarChart width={800} height={700} layout="vertical" data={stateItems}>
            <Bar dataKey="count" fill="#8884d8" />
            <Tooltip />
            <XAxis type="number" />
            <YAxis type="category" dataKey="token" width={100} />
          </BarChart>
        }
      </Control>
    </>
  );
}

export default App;
