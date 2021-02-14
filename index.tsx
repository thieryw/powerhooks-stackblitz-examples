import React from 'react';
import { render } from 'react-dom';
import {useDomRect} from "powerhooks/useDomRect";



const App = ()=>{

  const {
    ref: textareaRef,
    "domRect": {
      width: textareaWidth,
      height: textareaHeight
    }
  } = useDomRect();

  return(
    <div>

      <h1>useDomRect</h1>


      <textarea ref={textareaRef} placeholder={`${textareaWidth} * ${textareaHeight}`}/>



      

      
    </div>
  )
}

render(<App />, document.getElementById('root'));
