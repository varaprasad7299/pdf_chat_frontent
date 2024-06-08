import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SubmitButton.css'

const SubmitButton = ({stage,file,setStage}) => {
    const  handleClick = async ()=>{
        if(file==null){
            alert("Select a file")
            return
        }
       
        setStage(1)
        let formData = new FormData()
        formData.append("file",file) 
        await fetch('https://pdf-chat-g5tg.onrender.com/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('File uploaded successfully:', data);
            setStage(2)
        })
        .catch(error => {
            console.error('There was a problem with the file upload:', error);
            alert("There was a problem or the file has more than 100 pages")
            setStage(0)
        });
    }


  return (
    
    <div onClick={handleClick} className='submitButton'>
        <div className="btn">
            <p>Submit</p>
            {stage===1 &&  <FontAwesomeIcon icon={faSpinner} className='fa-spin'/>}
        </div>
        
    </div>
  )
}

export default SubmitButton