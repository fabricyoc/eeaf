import { FaTimes } from "react-icons/fa";

import styles from "./ProfileModal.module.css";

function ProfileModal({
  title,
  subtitle,
  icon,
  image,

  fields = [],
  form = {},

  readOnly = false,

  showSaveButton = true,

  onChange,
  onClose,
  onSave,

  saveText = "Salvar Alterações",
  closeText = "Fechar",

  children,
}) {

  function handleChange(e) {

    if (!onChange) {
      return;
    }

    const {
      name,
      value
    } = e.target;

    onChange(name, value);

  }

  return (

    <div
      className={styles.overlay}
      onClick={onClose}
    >

      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.close}
          onClick={onClose}
          type="button"
        >
          <FaTimes />
        </button>
        <div
          className={styles.header}
        >
          {
            image && (
              <img
                src={image}
                alt={title}
                className={styles.photo}
              />
            )
          }
          <div>
            <h2>
              {icon}
              {title}
            </h2>
            {
              subtitle && (

                <span>
                  {subtitle}
                </span>

              )
            }
          </div>
        </div>
        <div
          className={styles.grid}
        >
          {
            fields.map((field) => (
              <div
                key={field.name}
                className={styles.field}
              >
                <label>
                  {field.label}
                </label>

                {
                  field.type === "select"
                    ? (
                      <select
                        name={field.name}
                        value={form[field.name] ?? ""}
                        onChange={handleChange}
                        disabled={readOnly}
                      >
                        {
                          field.options?.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </option>
                          ))
                        }
                      </select>
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={form[field.name] ?? ""}
                        onChange={handleChange}
                        readOnly={readOnly}
                      />
                    )
                }
              </div>
            ))
          }
          {children}

        </div>

        <div
          className={styles.actions}
        >

          <button
            className={styles.cancel}
            type="button"
            onClick={onClose}
          >
            {closeText}
          </button>
          {
            showSaveButton && (

              <button
                className={styles.save}
                type="button"
                onClick={onSave}
              >
                {saveText}
              </button>

            )
          }
        </div>
      </div>
    </div>
  );
}
export default ProfileModal;
