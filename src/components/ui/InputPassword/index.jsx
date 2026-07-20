import { useState } from "react";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import styles from "./InputPassword.module.css";


function InputPassword({
  id,
  label,
  error,
  ...props
}) {

  const [
    showPassword,
    setShowPassword
  ] = useState(false);


  return (
    <div
      className={styles.input_group}
    >

      <label htmlFor={id}>
        {label}
      </label>


      <div
        className={
          styles.password_container
        }
      >

        <input
          id={id}
          type={
            showPassword
              ? "text"
              : "password"
          }
          {...props}
        />


        <button
          type="button"
          className={
            styles.eye_button
          }
          onClick={() =>
            setShowPassword(
              (prev) => !prev
            )
          }
          aria-label={
            showPassword
              ? "Ocultar senha"
              : "Mostrar senha"
          }
        >
          {
            showPassword
              ? <FaEyeSlash />
              : <FaEye />
          }
        </button>
      </div>

      {
        error && (
          <span
            className={styles.error}
          >
            {error}
          </span>
        )
      }
    </div>
  );
}

export default InputPassword;
