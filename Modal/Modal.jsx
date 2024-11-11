import React from 'react'
import "./App.css";
const Modal = ({handleClose,handleOffer}) => {
  
    const handleOutsideClick=(e)=>{
        if(e.target.className==='modal'){
            handleClose();
        }
    }
    return (
    <div className='modal' onClick={handleOutsideClick}>
      <div className='modal-content'>
      <button onClick={handleClose} className='close-btn'>X</button>
      <div className='content'>
        Click the button below to accept our amazing offer!
      </div>
      <button onClick={handleOffer} className='accept-btn'>
        Accept Offer
      </button>
      </div>
    </div>
  )
}

export default Modal
