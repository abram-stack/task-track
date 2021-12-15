// import styled from 'styled-components'
// import { Cross } from '@styled-icons/entypo/Cross'
import CloseIcon from '@mui/icons-material/Close';

const Task = ({ task, onDelete, onToggle}) => {
  return (
    <div className="task" onDoubleClick={()=> onToggle(task.id)}>
      <h3>{task.text}<CloseIcon onClick={() => onDelete(task.id) }/> </h3>
      <p>{task.day}</p>
    </div>
  )
}

export default Task
