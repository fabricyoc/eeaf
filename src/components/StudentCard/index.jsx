import styles from "./StudentCard.module.css";

function StudentCard({ aluno }) {
  return (
    <div className={styles.card}>

      <img
        className={styles.photo}
        src={`https://drive.google.com/thumbnail?id=${aluno.Foto_Id}&sz=w1000`}
        alt={aluno.Nome}
      />

      <h3 className={styles.name}>
        {aluno.Nome}
      </h3>

      <p className={styles.email}>
        {aluno["E-mail"]}
      </p>

      <p className={styles.classroom}>
        {aluno.turma}
      </p>

      <button className={styles.button}>
        Ver Perfil
      </button>

    </div>
  );
}

export default StudentCard;