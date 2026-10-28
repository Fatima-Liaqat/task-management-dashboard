import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <div>
  {tasks.length === 0 && (
    <div className="empty-state">No tasks available. Add one above!</div>
  )}

  {tasks.map((task) => (
    <TaskCard
      key={task.id}
      task={task}
      onToggleTask={onToggleTask}
      onDeleteTask={onDeleteTask}
    />
  ))}
</div>
  );
};

export default TaskList;