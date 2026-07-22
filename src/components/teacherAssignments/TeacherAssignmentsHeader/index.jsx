import { FaPlus } from "react-icons/fa";

import HeaderDashboard from "../../HeaderDashboard";

import SearchTeacherAssignments
  from "../SearchTeacherAssignments";

import styles from "./TeacherAssignmentsHeader.module.css";

function TeacherAssignmentsHeader({

  assignments,

  onSearch,

  setBuscaAtiva,

  onNovo

}) {

  return (

    <HeaderDashboard
      title="Alocação de Docentes"
    >

      <div className={styles.actions}>

        <SearchTeacherAssignments

          assignments={assignments}

          onSearch={onSearch}

          setBuscaAtiva={setBuscaAtiva}

        />

        <button

          type="button"

          className={styles.button}

          onClick={onNovo}

        >

          <FaPlus />

          Nova Alocação

        </button>

      </div>

    </HeaderDashboard>

  );

}

export default TeacherAssignmentsHeader;
