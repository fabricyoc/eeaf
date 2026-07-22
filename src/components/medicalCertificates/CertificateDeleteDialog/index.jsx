import { FaTrash } from "react-icons/fa";

import ConfirmDialog from "../../ui/ConfirmDialog";

import styles from "./CertificateDeleteDialog.module.css";

function CertificateDeleteDialog({
  open,
  atestado,
  onConfirm,
  onClose
}) {

  return (

    <ConfirmDialog
      open={open}
      title="Excluir Atestado"
      icon={<FaTrash />}
      variant="danger"
      confirmText="Excluir Atestado"
      cancelText="Cancelar"
      onConfirm={onConfirm}
      onClose={onClose}
    >

      <div className={styles.content}>

        <p className={styles.info}>

          <strong>Aluno:</strong>{" "}
          {atestado?.alunos?.nome || "-"}

          <br />

          <strong>Turma:</strong>{" "}
          {atestado?.alunos?.turmas?.nome?.toUpperCase() || "-"}

          <br />

          <strong>Período:</strong>{" "}

          {atestado?.data_inicio}{" "}
          até{" "}
          {atestado?.data_fim}

        </p>

        <p className={styles.warning}>

          ⚠️ Ao excluir este atestado, todas as informações relacionadas a este registro serão removidas permanentemente do sistema.

        </p>

        <p className={styles.finalWarning}>

          Esta ação não poderá ser desfeita.

        </p>

      </div>

    </ConfirmDialog>

  );

}

export default CertificateDeleteDialog;
