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
  const addTask = async (task) => {
    // post to server
    const result = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    // set state UI
    const data = await result.json();
    setTasks([...tasks, data]);
  }


  // Delete task 
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
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
