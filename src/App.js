import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';

function App() {
  // we want to have the state in top level component 
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([])
  
  // useEffect is async function
  useEffect(() => {
    const getTasks = async () => {
      const fetchFromDB = await fetchTasks();
      setTasks(fetchFromDB);
    }
    getTasks();
  }, [])

  // fetch data 
  const fetchTasks = async() => {
      const result = await fetch('http://localhost:5000/tasks');
      const data = await result.json();
      return data;
  }
  
  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = {
      id, ...task
    }
    setTasks([...tasks, newTask]);
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
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      { showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) :
        ('No to show')
      }
    </div>
  );
}

export default App;
