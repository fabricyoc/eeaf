import styles from "./StudentGrid.module.css";
import StudentCard from "../StudentCard";

function StudentGrid({ alunos }) {
  return (
    <div className={styles.grid}>
      {alunos.map((aluno, index) => (
        <StudentCard key={index} aluno={aluno} />
      ))}
    </div>
  );
}

export default StudentGrid;
