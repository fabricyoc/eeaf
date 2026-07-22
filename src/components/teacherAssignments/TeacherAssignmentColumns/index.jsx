import styles from "./TeacherAssignmentColumns.module.css";


export const teacherAssignmentColumns = [

  {
    key: "professor",

    label: "Professor",

    render: (assignment) => (

      <span className={styles.name}>

        {assignment.users?.name || "-"}

      </span>

    )

  },


  {
    key: "turma",

    label: "Turma",

    render: (assignment) => (

      <span className={styles.badge}>

        {
          assignment.turmas?.nome
            ?.toUpperCase() || "-"
        }

      </span>

    )

  },


  {
    key: "disciplina",

    label: "Disciplina",

    render: (assignment) => (

      <span>

        {
          assignment.disciplinas?.nome || "-"
        }

      </span>

    )

  }

];