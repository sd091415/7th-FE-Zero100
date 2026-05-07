import { useState } from "react";
import Checkbox from "../Components/Checkbox.jsx";
import Text from "../Components/Text.jsx";
import Button from "../Components/Button.jsx";
import Input from "../Components/Input.jsx";
import { useTodo } from "../Contexts/TodoContexts.jsx";

export default function TodoTitle ({ task }){
    // 수정 중인지 확인
    const [isEditing, setIsEditing] = useState(false);
    // 수정 중인 Title 확인
    const [editTitle, setEditTitle] = useState(task.title);

    const { toggleTask, deleteTask, editTask } = useTodo();

    // 수정 완료시 실행
    const handleSave = () =>{
        if (!editTitle.trim()) return; // 빈 값 방지
        editTask(task.id, editTitle);    // 부모 컴포넌트로 수정된 내용 전달
        setIsEditing(false);           // 읽기 모드로 전환
    };

    // 수정 단계
    if (isEditing) {
        return(
            <li className="border border-gray-200 rounded-md p-4 mb-4 bg-white list-none">
                <div className="mb-4">
                    <Text tagName="p" className="text-sm text-gray-600 mb-2">
                        New name for <span className="font-bold text-black">{task.title}</span>
                    </Text>
                    <Input 
                        value={editTitle} 
                        onChange={setEditTitle}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black"/>
                </div>
                <div className="flex gap-2">
                    <Button 
                        onClick={() => setIsEditing(false)} 
                        className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-medium">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSave} 
                        className="flex-1 bg-black text-white py-2 rounded-md font-medium">
                        Save
                    </Button>
                </div>
            </li>
        )
    }
    // 기본적인 읽기 단계
    return (
        <li key={task.id} className="border border-gray-200 rounded-md p-4 mb-4 bg-white list-none">
            <div className="flex items-center gap-3 mb-4">
                <Checkbox
                    id={task.id}
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5"
                />
                <Text tagName="span" className="text-lg">{task.title}</Text>
            </div>
            <div className="flex gap-2">
                <Button onClick={() => setIsEditing(true)} className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-medium">Edit</Button>
                <Button onClick={() => deleteTask(task.id)} className="flex-1 bg-red-600 text-white py-2 rounded-md font-medium">Delete</Button>
            </div>
        </li>
    );
}