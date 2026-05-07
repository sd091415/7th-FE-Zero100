import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const Form = ({ addTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleAdd = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    addTask(trimmed);
    setNewTask('');
  };

  return (
    <div className="mb-8">
      <Input
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
     <Button label="Add" onClick={handleAdd} />
    </div>
  );
};

export default Form;