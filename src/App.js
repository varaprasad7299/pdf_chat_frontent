
import { useState,useEffect } from 'react';
import './App.css';
import FileUpload from './FileUpload/FileUpload';
import FileList from './FileList/FileList';
import SubmitButton from './SubmitButton/SubmitButton';
import ChatComponent from './ChatComponent/ChatComponent';


function App() {
  const [file,setFile] = useState(null)
  const [fileName,setFileName] = useState(()=>{
    return JSON.parse(sessionStorage.getItem("filename")) || ""
  })
  const [stage,setStage] = useState(()=>{
    return parseInt(sessionStorage.getItem('step')) || 0;
  })
  
  useEffect(() => {
    // Store the step in sessionStorage whenever it changes
    sessionStorage.setItem('step', stage);

  }, [stage]);

  useEffect(() => {
    // Store the step in sessionStorage whenever it changes
    sessionStorage.setItem('filename', JSON.stringify(fileName));
    
  }, [fileName]);
 
  const removeFile = (fileName)=>{
    setFile(null)
    setFileName("")
  }
  

 
  return (
    <div className="App">
      <div>
      {stage!==2 && <>
        <p className="title">Upload PDF document</p>
        <FileUpload file={file} setFile={setFile} setFileName={setFileName}/>
        <FileList filename={file} removeFile={removeFile}/>
        <SubmitButton stage={stage} file={file} setStage={setStage}/>
        </>
      }
      {
        stage===2 && <ChatComponent setStage={setStage} setFile={setFile} filename={fileName} setFileName={setFileName} />
      }
      {/*  */}
      
      </div>
      
    </div>
  );
}

export default App;
