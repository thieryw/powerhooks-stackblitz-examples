import React,{ useState, useCallback, useEffect, memo } from 'react';
import { render } from 'react-dom';
import {useCallbackFactory} from "powerhooks/useCallbackFactory";
import { useConstCallback } from "powerhooks/useConstCallback";


type Props= {
  priority: number;
  task: string;
  onClick(action: "DELETE" | "EDIT", task: string): void;
};


const Item= memo((props: Props)=>{


  const { priority, task, onClick} = props;

  console.log(`render ${task}`);

  const onEditClick = useConstCallback(()=> onClick("EDIT", task));
  const onDeleteClick = useConstCallback(()=> onClick("DELETE", task));

  return (
    <div>
      <h1>Priority: {priority}: {task}</h1>
      <button onClick={onEditClick}>EDIT</button>
      <button onClick={onDeleteClick}>DELETE</button>
    </div>
  )

});

//====================


const App = ()=>{

  const [todos, setTodos] = useState<{ priority: number; task: string; }[]>(
    [
      { "priority": 8, "task": "Fuck my phather" },
      { "priority": 9, "task": "Drink water" }
    ]
  );

  useEffect(
    ()=>{

      setTimeout(
        ()=> {

          console.log("================About to add a item...")

          setTodos(todos=> [...todos, { "priority": 3, "task": "Empty trash" }]);

        },
        5000
      );


    },
    []
  );

  /*
  const onClick = useCallback(
    (action: "DELETE" | "EDIT", task: string)=> {
      alert(`Click on "${task}", action requested: ${action}`)
    },
    []
  );
  */

  const onClickFactory = useCallbackFactory(
    (
      [task, priority]: [string, number], 
      [action]: Parameters<Props["onClick"]>
    )=> alert(`Click on "${task}${priority}", action requested: ${action}`)
  );

  return(
    <div>
    {
      todos.map(({ priority, task })=> 
        <Item
          key={task}
          priority={priority}
          task={task}
          onClick={onClickFactory(task, priority)}
        />
      )
    }  
    </div>
  )
}

render(<App />, document.getElementById('root'));


