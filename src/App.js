import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  // we want to have the state in top level component
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  // useEffect is async function
  useEffect(() => {
    const getTasks = async () => {
      const fetchFromDB = await fetchTasks();
      setTasks(fetchFromDB);
    };
    getTasks();
  }, []);

  // FETCH DATA
  const fetchTasks = async () => {
    const result = await fetch("http://localhost:5000/tasks");
    const data = await result.json();
    return data;
  };

  const fetchTask = async (id) => {
    const result = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await result.json();
    return data;
  };

  // ADDTASK
  const addTask = async (task) => {
    // post to server
    const result = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    // set state UI
    const data = await result.json();
    setTasks([...tasks, data]);
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // TOGGLE REMINDER
  const toggleReminder = async (id) => {
    // get single task from server
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const result = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    //get the result as js object
    const data = await result.json();

    // change state UI
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <BrowserRouter>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No to show"
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
