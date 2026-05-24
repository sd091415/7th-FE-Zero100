export default function Text({ children, tagName: Tag = "p", className }){
    // 다양한 태그를 렌더링하는 텍스트 컴포넌트
    return (<Tag className = { className }>{children}</Tag>);
}