import { FaTimes } from "react-icons/fa";
import styles from "./ConfirmDialog.module.css";

function ConfirmDialog({
  open,
  title = "Confirmação",
  icon,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  onConfirm,
  onClose,
  children
}) {
  if (!open) { return null; }

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
          type="button"
          className={styles.close}
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <div className={styles.header}>
          {
            icon &&
            <div className={styles.icon}>
              {icon}
            </div>
          }
          <h2>
            {title}
          </h2>
        </div>

        {
          description &&
          <p className={styles.description}>
            {description}
          </p>
        }

        {
          children &&
          <div className={styles.content}>
            {children}
          </div>
        }

        <div className={styles.footer}>

          <button
            type="button"
            className={styles.cancel}
            onClick={onClose}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={
              variant === "danger"
                ? styles.danger
                : styles.primary
            }
            onClick={onConfirm}
          >
            {confirmText}
          </button>

        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
