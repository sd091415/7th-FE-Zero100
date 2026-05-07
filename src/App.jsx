import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Form from './features/Form';
import FilterButtons from './features/FilterButtons';
import TodoItem from './features/TodoItem';

function App() {
  // 동적 초기화
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todoData');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [
        { id: 1, text: 'Eat', completed: false },
        { id: 2, text: 'Sleep', completed: false },
        { id: 3, text: 'Repeat', completed: false },
      ];
    }
  });

  // todos 배열이 바뀔 때마다 LocalStorage에 자동으로 저장
  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todos));
  }, [todos]);

  const navigate = useNavigate();
  const location = useLocation();

  const addTask = (name) => {
    setTodos((prev) => [...prev, { id: Date.now(), text: name, completed: false }]);
  };

  const toggleTask = (id) => {
    setTodos((prev) =>
      prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  };

  const deleteTask = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTask = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) => todo.id === id ? { ...todo, text: newText } : todo)
    );
  };

  const currentPath = location.pathname;
  const filteredTodos = todos.filter((todo) => {
    if (currentPath === '/active') return !todo.completed;
    if (currentPath === '/completed') return todo.completed;
    return true;
  });

  const activeTasksCount = todos.filter((todo) => !todo.completed).length;

  const todoListUI = (
    <ul className="space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          toggleTask={toggleTask} 
          deleteTask={deleteTask} 
          editTask={editTask} 
        />
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        
        <h1 className="text-4xl font-extrabold text-center mb-2">TodoMatic</h1>
        <h2 className="text-center text-gray-500 mb-6 text-lg">What needs to be done?</h2>

        <Form addTask={addTask} />

        <FilterButtons currentPath={currentPath} navigate={navigate} />

        <h2 className="text-lg font-bold mb-4">
          {activeTasksCount} tasks remaining
        </h2>

        <Routes>
          {['/', '/all', '/active', '/completed'].map((path) => (
            <Route key={path} path={path} element={todoListUI} />
          ))}
        </Routes>

      </div>
    </div>
  );
}

export default App;