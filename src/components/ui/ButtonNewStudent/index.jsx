import { FaPlus } from "react-icons/fa";
import styles from "./ButtonNewStudent.module.css";

function ButtonNewStudent({ onNovoAluno }) {
  return (
    <button
      type="button"
      className={styles.button_new_student}
      onClick={onNovoAluno}
    >
      <FaPlus />
      <span>Novo Aluno</span>
    </button>
  );
}

export default ButtonNewStudent;
