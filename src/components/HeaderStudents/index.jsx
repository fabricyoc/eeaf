import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import SearchBar from "../SearchBar";

import styles from "./HeaderStudents.module.css";

function HeaderStudents({
  todosAlunos,
  setAlunos,
  onNovoAluno,
}) {
  const navigate = useNavigate();

  return (
    <header className={styles.container}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        <span>Voltar</span>
      </button>

      <div className={styles.search}>
        <SearchBar
          todosAlunos={todosAlunos}
          setAlunos={setAlunos}
        />
      </div>

      <button
        type="button"
        className={styles.button}
        onClick={onNovoAluno}
      >
        <FaPlus />
        <span>Novo Aluno</span>
      </button>
    </header>
  );
}

export default HeaderStudents;
