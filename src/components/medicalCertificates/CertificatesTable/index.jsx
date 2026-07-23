import {
  FaEdit,
  FaTrash,
  FaEye
} from "react-icons/fa";
import DataTable from "../../ui/DataTable";
import { useRole } from "../../../hooks/useRole";
import styles from "./CertificatesTable.module.css";
function somenteData(data) {
  if (!data) {
    return "";
  }
  return data.substring(0, 10);
}
function formatarData(data) {
  const dataLimpa = somenteData(data);
  if (!dataLimpa) {
    return "-";
  }
  return dataLimpa
    .split("-")
    .reverse()
    .join("/");
}
function CertificatesTable({
  lista,
  buscaAtiva,
  onVisualizar,
  onEditar,
  onExcluir,
  canEditCertificates,
  canDeleteCertificates,
  canShowActions,
}) {
  const {
    role
  } = useRole();
  const mostrarCadastradoPor =
    ![
      "secretary",
      "coordinator",
      "admin"
    ].includes(role);
  const columns = [
    {
      key: "aluno",
      label: "Aluno(a)",
      render: (row) =>
        row.alunos?.nome?.toUpperCase()
        ||
        "-",
    },
    {
      key: "turma",
      label: "Turma",
      render: (row) =>
        row.alunos?.turmas?.nome?.toUpperCase()
        ||
        "-",
    },
    {
      key: "inicio",
      label: "Início",
      render: (row) =>
        formatarData(
          row.data_inicio
        ),
    },
    {
      key: "fim",
      label: "Fim",
      render: (row) =>
        formatarData(
          row.data_fim
        ),
    },
  ];
  if (mostrarCadastradoPor) {

    columns.push({

      key: "cadastrado_por",

      label: "Cadastrado por",

      render: (row) => (

        <span className={styles.registeredBy}>

          {
            row.usuarioCadastro?.name?.toUpperCase() || "-"
          }

        </span>

      ),

    });

  }
  if (
    buscaAtiva &&
    lista.length === 0
  ) {
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
            <div className={styles.actions}>
              {
                onVisualizar && (
                  <button
                    type="button"
                    className={styles.view}
                    onClick={() =>
                      onVisualizar(row)
                    }
                    title="Visualizar atestado"
                  >
                    <FaEye />
                  </button>
                )
              }
              {
                canEditCertificates && (
                  <button
                    type="button"
                    className={styles.edit}
                    onClick={() =>
                      onEditar(row)
                    }
                    title="Editar atestado"
                  >
                    <FaEdit />
                  </button>
                )
              }
              {
                canDeleteCertificates && (
                  <button
                    type="button"
                    className={styles.delete}
                    onClick={() =>
                      onExcluir(row)
                    }
                    title="Excluir atestado"
                  >
                    <FaTrash />
                  </button>
                )
              }
            </div>
          )
          : null
      }
    />
  );
}
export default CertificatesTable;
