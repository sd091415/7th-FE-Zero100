export default function Checkbox({ id, checked, onChange, className}){
    // 체크박스 컴포넌트
    return(
        <input type = "checkbox" id = {id} checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className = {className}/>
    );
}