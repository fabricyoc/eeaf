import styles from "./DisciplineColumns.module.css";

export const disciplineColumns = [
  {
    key: "nome",
    label: "Disciplina",
    render: (disciplina) =>
      disciplina.nome?.toUpperCase() || "-"
  },

  {
    key: "codigo",
    label: "Código",
    render: (disciplina) =>
      disciplina.codigo || "-"
  },

  {
    key: "turmas",
    label: "Turmas",

    render: (disciplina) => {

      if (!disciplina.turma_disciplina?.length) {
        return (
          <span className={styles.empty}>
            Sem turma
          </span>
        );
      }

      return (
        <div className={styles.badges}>

          {disciplina.turma_disciplina.map(item => (

            <span
              key={item.turma_id}
              className={styles.badge}
            >
              {item.turmas?.nome?.toUpperCase()}
            </span>

          ))}

        </div>
      );

    }
  }
];