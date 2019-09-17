import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

let form = new FormData();

const API = 'http://taskmaster-dev.us-east-1.elasticbeanstalk.com/api/v1'

function App() {

  const [tasks, setTasks] = useState([]);
  

  function _getTasks(){
    fetch(API+'/tasks')
      .then(results=>results.json())
      .then(tasks=>setTasks(tasks));
      console.log('getting tasks')
  }

  function _handleChange(event){
    let value = event.target.files ? event.target.files[0] : event.target.value;
    form.set(event.target.name, value);
  }

  function _handleSubmit(event){
    event.preventDefault();
    fetch(API+'/tasks/'+event.target.id.value+'/images',{
      method: "POST",
      mode: 'no-cors',
      body: form,
    })
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response);
      _getTasks();
    })
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
              <img src={task.imgUrl? task.imgUrl :''} alt='task'></img>
              <img src={task.imgUrl?[task.imgUrl.slice(0, 39), 'resized', task.imgUrl.slice(39)].join(''):''} alt='task-fullsize'></img>
              <form onSubmit={_handleSubmit} action={API+'/tasks/'+task.id+'/images'} method='POST' encType="multipart/form-data">
              <span>Add Image</span>
              <input onChange={_handleChange} name="file" type="file" />
              <button name='id' value={task.id}>submit</button>
              </form>
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
