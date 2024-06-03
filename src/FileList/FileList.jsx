import React from 'react'
import './FileList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

const FileList = ({filename,removeFile}) => {
  const getFileName = ()=>{
    if(filename){
        return filename.name 
    }
    return "No File Chosen"
  }
  return (
    <div className='fileList'>
        <FontAwesomeIcon icon = {faFileAlt}/>
        <p>{getFileName()}</p>
        <FontAwesomeIcon icon = {faTrash} onClick={()=>removeFile(filename)}/>
    </div>
  )
}

export default FileList