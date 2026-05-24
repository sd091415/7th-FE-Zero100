import { useMemo } from "react";
import { Routes, Route, NavLink } from "react-router";
import Text from "./Components/Text.jsx";
import Button from "./Components/Button.jsx";
import TodoList from "./Features/TodoList.jsx";
import TodoAdd from "./Features/TodoAdd.jsx";
import { useTodo } from "./Contexts/TodoContexts.jsx";

function App() {
  const { tasks, remainingTasks } = useTodo();
  
  const allTasks = tasks;
  // useMemo 적용: tasks 배열이 바뀔 때만 필터링 연산 수행
  const activeTasks = useMemo(() => tasks.filter(task => !task.done), [tasks]);
  const completedTasks = useMemo(() => tasks.filter(task => task.done), [tasks]);

  return(
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl p-6">
        <Text tagName="h1" className="text-3xl font-bold text-center mb-2">TodoMatic</Text>
        
        <TodoAdd />

        <div className="flex gap-2 mb-6">
          <NavLink to="/all" className={({ isActive }) => 
              `flex-1 text-center py-3 rounded-md font-medium transition-colors ${
                isActive ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`
            }>
            All
          </NavLink>
          <NavLink to="/" className={({ isActive }) => 
              `flex-1 text-center py-3 rounded-md font-medium transition-colors ${
                isActive ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`
            }>
            Active
          </NavLink>
          <NavLink to="/completed" className={({ isActive }) => 
              `flex-1 text-center py-3 rounded-md font-medium transition-colors ${
                isActive ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`
            }>
            Completed
          </NavLink>
        </div>

        <Text tagName="h3" className="text-lg font-bold text-gray-800 mb-4">
          {remainingTasks} tasks remaining
        </Text>
      
        <Routes>
          <Route path="/all" element={<TodoList tasks={allTasks} />} />
          <Route path="/" element={<TodoList tasks={activeTasks} />} />
          <Route path="/completed" element={<TodoList tasks={completedTasks} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;