
function TextInput({ name, value, onTextInputChange, children }) {
  return (
    <>
      <label htmlFor={name}>{children}</label>
      <input
        type="text"
        id={name}
        name={name}
        onChange={onTextInputChange}
        value={value}
      />
    </>
  );
}

export default TextInput;

  
