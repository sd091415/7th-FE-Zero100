import TodoTitle from "./TodoTitle.jsx";

export default function TodoList({ tasks }) {
  return (
    <ul>
      {/* 할 일 목록 배열을 순회하며 TodoTitle 컴포넌트 생성 */}
      {tasks.map((task) => (
        <TodoTitle 
          key={task.id} 
          task={task} 
        />
      ))}
    </ul>
  );
}