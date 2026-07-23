import {
  FaPlus
} from "react-icons/fa";
import HeaderDashboard
  from "../../HeaderDashboard";
import SearchDisciplines
  from "../SearchDisciplines";
import styles
  from "./DisciplinesHeader.module.css";

function DisciplinesHeader({
  disciplines,
  onSearch,
  setBuscaAtiva,
  onNovo
}) {

  return (
    <HeaderDashboard
      title="Disciplinas"
    >
      <div className={styles.actions}>
        <SearchDisciplines
          disciplines={disciplines}
          onSearch={onSearch}
          setBuscaAtiva={setBuscaAtiva}
        />
        <button
          type="button"
          className={styles.button}
          onClick={onNovo}
        >
          <FaPlus />
          Nova Disciplina
        </button>
      </div>
    </HeaderDashboard>
  );
}

export default DisciplinesHeader;
