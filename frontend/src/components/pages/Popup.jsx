function Popup(props, id){
    return (props.trigger) ? (
      <>
          <div className="popup">  
            <div className="popup__inner">
                <button 
                className='close-btn' 
                onClick={() => props.setTrigger()}
                >X</button>
                {props.children}
            </div>
          </div>
      </>
    ) : null;
  }


  export default Popup;