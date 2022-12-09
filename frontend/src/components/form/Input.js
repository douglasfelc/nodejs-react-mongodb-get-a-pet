import styles from './Input.module.css'

function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple,
  required,
  disabled
}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(multiple ? { multiple } : '')}
        {...(required ? { required } : '')}
        {...(disabled ? { disabled } : '')}
      />
    </div>
  )
}

export default Input
