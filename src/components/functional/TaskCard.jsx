import React from 'react';
import CardWrapper from './CardWrapper';

const TaskCard = ({ task, onToggleTask, onDeleteTask }) => {
  const priorityColor = {
    Low: 'green',
    Medium: 'orange',
    High: 'red'
  };

  return (
   <CardWrapper>
  <div className="task-card-content">
    <div>
      <span
        onClick={() => onToggleTask(task.id)}
        className={`task-title ${task.completed ? 'completed' : ''}`}
      >
        {task.title}
      </span>
      <span className={`badge badge-${task.priority.toLowerCase()}`}>
        {task.priority}
      </span>
    </div>
    <button className="btn-danger" onClick={() => onDeleteTask(task.id)}>
      Delete
    </button>
  </div>
</CardWrapper>
  );
};

export default TaskCard;