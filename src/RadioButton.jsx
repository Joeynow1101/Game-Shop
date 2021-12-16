function RadioButton({ value, children, onRadioChange }) {
  return (
    <span>
      {children}
      <label>
        <input
          type="radio"
          value="new"
          checked={value === "new"}
          onChange={onRadioChange}
          name="status"
        />
        New
      </label>&nbsp; &nbsp; &nbsp; 
      <label>
        <input
          type="radio"
          value="used"
          checked={value === "used"}
          onChange={onRadioChange}
          name="status"
        />
        Used
      </label>
    </span>
  );
}

export default RadioButton;
