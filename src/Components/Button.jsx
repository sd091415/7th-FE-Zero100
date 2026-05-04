export default function Button({ type = "button", onClick, children, className}){
    // 버튼 컴포넌트
    return (
        <button type={type} onClick={onClick} 
        className={className}> {children} </button>
    );
}