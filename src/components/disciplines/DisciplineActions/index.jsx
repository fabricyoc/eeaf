import {
  FaEdit,
  FaTrash,
  FaUsers
} from "react-icons/fa";

import styles from "./DisciplineActions.module.css";


function DisciplineActions({

  disciplina,

  onEdit,

  onManageClassrooms,

  onDelete

}) {


  return (

    <div
      className={styles.actions}
    >


      <button

        type="button"

        className={styles.edit}

        title="Editar disciplina"

        onClick={() =>
          onEdit(disciplina)
        }

      >

        <FaEdit />

        Editar

      </button>





      <button

        type="button"

        className={styles.edit}

        title="Gerenciar turmas"

        onClick={() =>
          onManageClassrooms(disciplina)
        }

      >

        <FaUsers />

        Turmas

      </button>





      <button

        type="button"

        className={styles.delete}

        title="Excluir disciplina"

        onClick={() =>
          onDelete(disciplina)
        }

      >

        <FaTrash />

        Excluir

      </button>



    </div>

  );

}


export default DisciplineActions;