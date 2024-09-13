import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types/types';

const App: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const clearSelection = () => {
    setSelectedTask(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Task Management App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskForm selectedTask={selectedTask} onClearSelection={clearSelection} />
        <TaskList onSelectTask={handleSelectTask} />
      </div>
    </div>
  );
};

export default App;
