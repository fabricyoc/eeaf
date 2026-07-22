import {
  FaTrash
} from "react-icons/fa";

import styles from "./TeacherAssignmentActions.module.css";


function TeacherAssignmentActions({

  assignment,

  onDelete

}) {


  return (

    <div
      className={styles.actions}
    >


      <button

        type="button"

        className={styles.delete}

        title="Remover alocação"

        onClick={() =>
          onDelete?.(assignment)
        }

      >

        <FaTrash />

        Excluir

      </button>


    </div>

  );

}


export default TeacherAssignmentActions;