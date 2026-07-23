import { FaEye } from "react-icons/fa";
import ConfirmDialog from "../../ui/ConfirmDialog";
import styles from "./CertificateViewDialog.module.css";

function formatarData(data) {
  if (!data) {
    return "-";
  }

  return data
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("/");
}

function CertificateViewDialog({
  open,
  atestado,
  onClose
}) {

  return (
    <ConfirmDialog
      open={open}
      title="Detalhes do Atestado"
      icon={<FaEye />}
      variant="info"
      confirmText="Fechar"
      cancelText=""
      onConfirm={onClose}
      onClose={onClose}
    >
      <div className={styles.content}>

        <div className={styles.info}>

          <div className={styles.itemHighlight}>
            <strong>Aluno</strong>
            <span>
              {atestado?.alunos?.nome?.toUpperCase() || "-"}
            </span>
          </div>

          <div className={styles.grid}>

            <div className={styles.item}>
              <strong>Turma</strong>
              <span>
                {atestado?.alunos?.turmas?.nome?.toUpperCase() || "-"}
              </span>
            </div>

            <div className={styles.item}>
              <strong>Turno</strong>
              <span>
                {atestado?.turno?.toUpperCase() || "INTEGRAL"}
              </span>
            </div>

            <div className={styles.item}>
              <strong>Início</strong>
              <span>
                {formatarData(atestado?.data_inicio)}
              </span>
            </div>

            <div className={styles.item}>
              <strong>Fim</strong>
              <span>
                {formatarData(atestado?.data_fim)}
              </span>
            </div>

          </div>

          <div className={styles.observation}>
            <strong>Observação</strong>
            <p>
              {atestado?.observacao || "Sem observações."}
            </p>
          </div>

        </div>

        <div className={styles.audit}>
          <div>
            <strong>Cadastrado por</strong>
            <span>
              {atestado?.usuarioCadastro?.name?.toUpperCase() || "-"}
            </span>
          </div>

          <div>
            <strong>Data do registro</strong>
            <span>
              {formatarData(atestado?.created_at)}
            </span>
          </div>

          <div>
            <strong>ID Registro</strong>
            <span>
              {atestado?.id || "-"}
            </span>
          </div>

        </div>

      </div>
    </ConfirmDialog>
  );
}

export default CertificateViewDialog;
