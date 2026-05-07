import { useState } from 'react';
import Checkbox from '../components/Checkbox';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';

const TodoItem = ({ todo, toggleTask, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.text);

  const handleSave = () => {
    const trimmed = editingText.trim();
    if (trimmed) {
      editTask(todo.id, trimmed);
    } else {
      setEditingText(todo.text);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingText(todo.text);
  };

  return (
    <li className="flex flex-col border border-gray-200 rounded-md p-4 bg-white">
      <div className="flex items-center gap-3 mb-4">
        
        {isEditing ? (
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-2">
              New name for <span className="text-black">{todo.text}</span>
            </label>
            <Input 
              value={editingText} 
              onChange={(e) => setEditingText(e.target.value)} 
            />
          </div>
        ) : (
          <>
            <Checkbox checked={todo.completed} onChange={() => toggleTask(todo.id)} />
            <Text className={todo.completed ? "line-through text-gray-400" : "text-gray-900"}>
              {todo.text}
            </Text>
          </>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button label="Cancel" onClick={handleCancel} />
            <Button label="Save" onClick={handleSave} />
          </>
        ) : (
          <>
            <Button label="Edit" onClick={() => setIsEditing(true)} />
            <Button label="Delete" onClick={() => deleteTask(todo.id)} />
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;