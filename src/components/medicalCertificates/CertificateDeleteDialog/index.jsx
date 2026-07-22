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

        <div className={styles.info}>
          <p>
            <strong>Aluno:</strong>{" "}
            {atestado?.alunos?.nome?.toUpperCase() || "-"}
          </p>
          <p>
            <strong>Turma:</strong>{" "}
            {atestado?.alunos?.turmas?.nome?.toUpperCase() || "-"}
          </p>
          <p>
            <strong>Período:</strong>{" "}
            {atestado?.data_inicio ?
              atestado.data_inicio.substring(0, 10)
                .split("-")
                .reverse()
                .join("/")
              : "-"
            }
            {" "}até{" "}
            {atestado?.data_fim ?
              atestado.data_fim.substring(0, 10)
                .split("-")
                .reverse()
                .join("/")
              : "-"
            }
          </p>
        </div>

        <div className={styles.warning}>
          <strong>Atenção</strong>
          <p>
            Ao excluir este atestado, o registro será removido
            permanentemente do sistema. Essa ação poderá afetar
            o histórico de afastamentos e justificativas do aluno.
          </p>
        </div>

        <p className={styles.irreversible}>
          Esta ação não poderá ser desfeita!
        </p>

      </div>
    </ConfirmDialog>
  );
}
export default CertificateDeleteDialog;
