import React, { useState, useRef, useEffect } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');

  // useRef to focus input automatically on mount
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      id: Date.now(),
      title,
      priority,
      completed: false
    });

    setTitle('');
    setPriority('Low');
    inputRef.current.focus(); // Re-focus input after submit
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
  <input
    ref={inputRef}
    type="text"
    placeholder="Enter task title..."
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  <select value={priority} onChange={(e) => setPriority(e.target.value)}>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>
  <button type="submit" className="btn-primary">Add Task</button>
</form>
  );
};

export default TaskForm;