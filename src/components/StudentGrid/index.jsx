import styles from "./StudentGrid.module.css";
import StudentCard from "../StudentCard";

function StudentGrid({ alunos, onView, role }) {
  return (
    <div className={styles.grid}>
      {
        alunos.map((aluno, index) => (
          <StudentCard
            key={index}
            aluno={aluno}
            onView={onView}
            role={role}
          />
        ))
      }
    </div>
  );
}

export default StudentGrid;
