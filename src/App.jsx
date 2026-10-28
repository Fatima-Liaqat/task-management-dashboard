import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import TaskForm from './components/functional/TaskForm';
import TaskList from './components/functional/TaskList';
import ActivityLogger from './components/class/ActivityLogger';
import { ThemeContext } from './context/ThemeContext';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Custom hook for persistent tasks state
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('All');
  const [logs, setLogs] = useState([]);

  // Helper function to create log entries
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
  };

  // Synchronize document title with pending task count
  useEffect(() => {
    const pendingTasks = tasks.filter((t) => !t.completed).length;
    document.title = `Dashboard (${pendingTasks} pending)`;
  }, [tasks]);

  // Handler: Add Task
  const handleAddTask = useCallback((newTask) => {
    setTasks((prev) => [...prev, newTask]);
    addLog(`Added task: "${newTask.title}"`);
  }, [setTasks]);

  // Handler: Toggle Task (Log called outside state setter to prevent duplicates)
  const handleToggleTask = useCallback((id) => {
    const taskToToggle = tasks.find((t) => t.id === id);
    if (taskToToggle) {
      const willBeCompleted = !taskToToggle.completed;
      addLog(`Marked task "${taskToToggle.title}" as ${willBeCompleted ? 'Completed' : 'Pending'}`);
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, [tasks, setTasks]);

  // Handler: Delete Task (Log called outside state setter to prevent duplicates)
  const handleDeleteTask = useCallback((id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    if (taskToDelete) {
      addLog(`Deleted task: "${taskToDelete.title}"`);
    }

    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, [tasks, setTasks]);

  // Filtered tasks calculation using useMemo
  const filteredTasks = useMemo(() => {
    if (filter === 'Completed') return tasks.filter((t) => t.completed);
    if (filter === 'Pending') return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Task Dashboard</h1>
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
        </button>
      </header>

      <TaskForm onAddTask={handleAddTask} />

      <div className="filter-container">
        <label>Filter Tasks: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />

      <ActivityLogger logs={logs} />
    </div>
  );
}

export default App;