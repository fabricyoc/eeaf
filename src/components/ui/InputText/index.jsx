import styles from "./InputText.module.css";

function InputText({
  id,
  label,
  error,
  children,
  ...props
}) {
  return (
    <div className={styles.input_group}>
      <label htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        {...props}
      />

      {children}

      {error && (
        <span className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

export default InputText;
