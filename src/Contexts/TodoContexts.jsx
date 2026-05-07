import { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
      return JSON.parse(savedTasks); // 저장된 글자를 다시 배열로
    }
    // 기본값
    return [
      { id: 0, title: "Eat", done: true },
      { id: 1, title: "Sleep", done: false },
      { id: 2, title: "Repeat", done: false }
    ];
  });

  // 데이터가 변경될 때마다 로컬 스토리지에 자동 저장
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]); 

  // 할 일 추가
  const addTask = useCallback((input) => {
    const newTask = { id: Date.now(), title: input, done: false};
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  // 할 일 상태 토글 변경
  const toggleTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.map(task => (task.id === id) ? { ...task, done: !task.done } : task));
  }, []);

  // 할 일 수정
  const editTask = useCallback((id, newTitle) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, title: newTitle} : task));
  }, []);

  // 할 일 삭제
  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  // 남은 할 일 개수
  const remainingTasks = tasks.filter(task => !task.done).length;

  // useMemo를 사용해 최적화 
  const contextValue = useMemo(() => ({ 
      tasks, addTask, toggleTask, editTask, deleteTask, remainingTasks 
  }), [tasks, addTask, toggleTask, editTask, deleteTask, remainingTasks]);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
}

// 한번에 useContext와 TodoContext 불러오는 역할
export const useTodo = () => useContext(TodoContext); 