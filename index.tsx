import React from 'react';
import { render } from 'react-dom';
import {useWindowInnerSize} from "powerhooks/useWindowInnerSize";

//this hook triggers an event every time the window changes size.
//it returns an object with the current window width and height as properties.

const App = ()=>{

  const {windowInnerWidth} = useWindowInnerSize();
  const colors = ["red", "lightblue", "orange" , "green", "yellow"];
  
  
  return(
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: windowInnerWidth < 630 ? "column" : "unset",
      width: "100vw",
      height: "100vh"
      
      
    }}>
      {
        [1,2,3,4,5].map((buttonNumber, index)=> 
          <button style={{
            width: "100px",
            height: "30px",
            backgroundColor: `${colors[index]}`,
            margin: "10px"
          }} key={buttonNumber}>
            {buttonNumber}
          </button>)
      }
      
      
    </div>
  )
}

render(<App />, document.getElementById('root'));
