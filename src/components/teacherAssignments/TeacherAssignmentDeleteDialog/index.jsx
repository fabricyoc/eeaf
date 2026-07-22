import { FaTrash } from "react-icons/fa";
import ConfirmDialog from "../../ui/ConfirmDialog";

import styles from "./TeacherAssignmentDeleteDialog.module.css";

function TeacherAssignmentDeleteDialog({
  open,
  assignment,
  onConfirm,
  onClose
}) {

  return (

    <ConfirmDialog
      open={open}
      title="Desalocar Docente"
      icon={<FaTrash />}
      variant="danger"
      confirmText="Excluir Alocação"
      cancelText="Cancelar"
      onConfirm={onConfirm}
      onClose={onClose}
    >

      <div className={styles.content}>

        <div className={styles.info}>

          <p>
            <strong>Professor:</strong>{" "}
            {assignment?.users?.name}
          </p>

          <p>
            <strong>Turma:</strong>{" "}
            {assignment?.turmas?.nome?.toUpperCase()}
          </p>

          <p>
            <strong>Disciplina:</strong>{" "}
            {assignment?.disciplinas?.nome}
          </p>

        </div>

        <div className={styles.warning}>

          <strong>Atenção</strong>

          <p>
            Ao excluir esta alocação, o professor poderá perder o acesso
            ao diário desta turma incluindo notas,
            frequência, conteúdos, avaliações e demais registros
            vinculados.
          </p>

        </div>

        <p className={styles.irreversible}>
          Esta ação não poderá ser desfeita!
        </p>

      </div>

    </ConfirmDialog>

  );

}

export default TeacherAssignmentDeleteDialog;
