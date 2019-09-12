import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const API = 'http://taskmaster-dev.us-east-1.elasticbeanstalk.com/api/v1'

function App() {

  const [tasks, setTasks] = useState([]);

  function _getTasks(){
    fetch(API+'/tasks')
      .then(results=>results.json())
      .then(tasks=>setTasks(tasks));
  }

  useEffect( _getTasks, [] );

  return (
    <div className="App">
      <h1>Taskmaster</h1>
      <ul>
        {tasks.map((task,idx)=>{
          return(
            <li key={idx}>
              <details>
                <summary>
                  <h2 >{task.title}</h2>
                </summary>
              <p><strong>Person Assigned: </strong>{task.assignee}</p>
              <p><strong>Task Description: </strong>{task.description}</p>
              <History history={task.history}/>
              </details>
            </li>
            
          )
        })}
      </ul>
    </div>
  );
}

function History(props){
  return(
    <ol>
                {props.history.map((item,idx)=>{
                  return(
                    <li key={idx}>
                      <p><strong>{item.timestamp}</strong></p>
                      <p><strong>Note: </strong>{item.action}</p>
                    </li>
                  )
                })}
              </ol>
  )
}

export default App;
