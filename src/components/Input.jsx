const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black text-lg"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;