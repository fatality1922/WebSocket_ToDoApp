import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  state = {
    tasks: [],
    taskName: '',
  }

  componentDidMount() {
    this.socket = io.connect("localhost:8000");

  }

  render() {
    const { tasks, taskName } = this.state;
    return (
      <div className="App">

        <header>
          <h1>ToDoList.app</h1>
        </header>

        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>

          <ul className="tasks-section__list" id="tasks-list">

            {tasks.map((task) => (
              <li className='task' key={task.id} >
                {task.name}{' '}
                <button className='btn btn--red' onClick={() => this.removeTask(task.id, true)}> Remove </button>
              </li>
            ))}
            
          </ul>

          <form id="add-task-form">
            <input className="text-input" autocomplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>

        </section>
      </div>
    );
  };

};

export default App;