import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask';
import { useState } from 'react';

function App() {
  // we want to have the state in top level component 
  const [tasks, setTasks] = useState([{
    id: 1,
    text: 'Appointment with doctor',
    day: 'Feb 5th at 2:30pm',
    reminder: true
  },
  {
    id: 2,
    text: 'Working at Cafe',
    day: 'Feb 6th at 2:00pm',
    reminder: true
  },
  {
    id: 3,
    text: 'Buy Christmas Presents',
    day: 'Feb 7th at 2:30pm',
    reminder: false
    }])
  
  // Add Task
  const addTask = (task) => {
    console.log(task);
  }

  // Delete task 
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) =>  
      task.id == id ? { ...task, reminder: !task.reminder } :
        task
    ))
  }
  return (
    <div className="container">
      <Header />
      <AddTask onAdd={addTask}/>
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) :
        ('No to show')
      }
    </div>
  );
}

export default App;
