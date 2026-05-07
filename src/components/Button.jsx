const Button = ({ label, onClick, isActive }) => {
  //  공통 스타일
  const baseStyle = "font-bold transition-colors ";

  //  중복되는 스타일은 변수로 분리
  const secondaryStyle = "flex-1 bg-white border border-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-50";
  const filterStyle = `flex-1 py-2 rounded-md border ${
    isActive 
      ? 'bg-black text-white border-black' 
      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
  }`;

  // 라벨(label) 이름에 따른 스타일 맵핑 사전(Dictionary) 만들기
  const styleMap = {
    Add: "w-full border border-black bg-black text-white p-3 rounded-md text-lg mt-2",
    Save: "flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800",
    Delete: "flex-1 bg-[#ef4444] text-white py-2 rounded-md border border-[#ef4444] hover:bg-red-600",
    Edit: secondaryStyle,
    Cancel: secondaryStyle,
    All: filterStyle,
    Active: filterStyle,
    Completed: filterStyle,
  };

  // baseStyle과 styleMap에서 찾은 스타일을 합치기
  return (
    <button className={baseStyle + (styleMap[label] || "")} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;