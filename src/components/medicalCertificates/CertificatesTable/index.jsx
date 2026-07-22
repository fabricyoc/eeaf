import { FaEdit, FaTrash } from "react-icons/fa";

import DataTable from "../../ui/DataTable";

import styles from "./CertificatesTable.module.css";

function somenteData(data) {
  if (!data) {
    return "";
  }

  return data.substring(0, 10);
}

function CertificatesTable({
  lista,
  buscaAtiva,
  onEditar,
  onExcluir,
  canEditCertificates,
  canDeleteCertificates,
  canShowActions,
}) {
  const columns = [
    {
      key: "aluno",
      label: "Aluno(a)",
      render: (row) => row.alunos?.nome?.toUpperCase() || "-",
    },

    {
      key: "turma",
      label: "Turma",
      render: (row) => row.alunos?.turmas?.nome?.toUpperCase() || "-",
    },

    {
      key: "inicio",
      label: "Início",
      render: (row) =>
        somenteData(row.data_inicio)
          .split("-")
          .reverse()
          .join("/"),
    },

    {
      key: "fim",
      label: "Fim",
      render: (row) =>
        somenteData(row.data_fim)
          .split("-")
          .reverse()
          .join("/"),
    },

    {
      key: "turno",
      label: "Turno",
      render: (row) =>
        row.turno ? (
          <span className={styles.turno}>
            {row.turno.toUpperCase()}
          </span>
        ) : (
          <span className={styles.turno}>
            INTEGRAL
          </span>
        ),
    },
  ];

  if (buscaAtiva && lista.length === 0) {
    return (
      <div className={styles.empty}>
        Nenhum atestado encontrado.
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={lista}
      actions={
        canShowActions
          ? (row) => (
              <>
                {canEditCertificates && (
                  <button
                    type="button"
                    className={styles.edit}
                    onClick={() => onEditar(row)}
                    title="Editar atestado"
                    aria-label="Editar atestado"
                  >
                    <FaEdit />
                  </button>
                )}

                {canDeleteCertificates && (
                  <button
                    type="button"
                    className={styles.delete}
                    onClick={() => onExcluir(row)}
                    title="Excluir atestado"
                    aria-label="Excluir atestado"
                  >
                    <FaTrash />
                  </button>
                )}
              </>
            )
          : null
      }
    />
  );
}

export default CertificatesTable;
