export default function Input({ value, onChange, placeholder, className }){
    // 텍스트 입력창 컴포넌트
    return (
        <input type="text" value={value}
        onChange = {(e) => onChange(e.target.value)}
        placeholder = {placeholder}
        className = {className}/>
    );
}