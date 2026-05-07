const Checkbox = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      className="todo-checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Checkbox;