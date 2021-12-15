import Header from './components/Header'
import Tasks from './components/Tasks'
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
  
  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks}/>
    </div>
  );
}

export default App;
