import React from 'react'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './FileUpload.css'

const FileUpload = ({file,setFile,setFileName}) => {

  const handleChange = (event)=>{
    const file = event.target.files[0]
 
    setFile(file)
    setFileName(file.name)
  }
 
  return (
    <>
      <div className="pdfCard">
         <div className="fileInputs">
                <input type="file" onChange={handleChange}/>
                <button>
                  <i>
                      <FontAwesomeIcon icon={faPlus}/>
                  </i>
                   <p>upload</p>
                </button>
         </div>
         <p className="main">Supported files</p>
         <p className="info">PDF only</p>
      </div>
    </>
  )
}

export default FileUpload