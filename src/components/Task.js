// import styled from 'styled-components'
// import { Cross } from '@styled-icons/entypo/Cross'
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CloseIcon from "@mui/icons-material/Close";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`}>
      <h3>
        {task.text}
        <CloseIcon onClick={() => onDelete(task.id)} />
      </h3>
      <p>{task.day}</p>
      <h3>
        Remind me
        <AccessAlarmIcon onDoubleClick={() => onToggle(task.id)} />
      </h3>
    </div>
  );
};

export default Task;
