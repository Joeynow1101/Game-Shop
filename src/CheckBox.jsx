export default function Checkbox({ name, value, onCheckboxChange, children }) {
  return (
    <label>
      <input
        type="checkbox"
        name={name}
        id={name}
        onChange={onCheckboxChange}
        checked={value}
      />
      {""}
      {children}
    </label>
  );
}
