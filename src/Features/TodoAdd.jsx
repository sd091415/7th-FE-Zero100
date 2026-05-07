import { useState } from "react";
import Text from "../Components/Text.jsx";
import Input from "../Components/Input.jsx";
import Button from "../Components/Button.jsx";
import { useTodo } from "../Contexts/TodoContexts.jsx";

export default function TodoAdd(){
    // 입력창의 텍스트 상태 관리
    const [input, setInput] = useState ("");
    const {addTask} = useTodo();

    // Add 버튼 클릭시 발생
    const handleClick = () => {
    if (!input.trim()) return; // 공백값 입력 방지
    addTask(input);          
    setInput("");
  };

  return(
    <div className="mb-6">
        <Text tagName="h2" className="text-center mb-4 text-base">What needs to be done?</Text>
        <Input value={input} onChange={setInput} className="w-full border border-gray-300 p-3 mb-3 rounded-md focus:outline-none"/>
        <Button onClick={handleClick} className="w-full bg-black text-white font-bold py-3 rounded-md">Add</Button>
    </div>
  )
}