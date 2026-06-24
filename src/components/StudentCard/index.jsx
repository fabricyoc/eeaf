import styles from "./StudentCard.module.css";

function StudentCard({ aluno }) {

  const fotoId = aluno?.Foto_Id?.trim();

  const fotoUrl = fotoId
    ? `https://drive.google.com/thumbnail?id=${fotoId}&sz=w1000`
    : "https://placehold.co/150x150?text=Sem+Foto";

  return (
    <div className={styles.card}>

      <img
        className={styles.photo}
        src={fotoUrl}
        alt={aluno?.Nome || "Aluno"}
        onError={(e) => {
          e.target.src =
            "https://placehold.co/150x150?text=Sem+Foto";
        }}
      />

      <h3 className={styles.name}>
        {aluno?.Nome}
      </h3>

      <p className={styles.email}>
        {aluno?.["E-mail"]}
      </p>

      <p className={styles.classroom}>
        {aluno?.turma}
      </p>

      <button className={styles.button}>
        Ver Perfil
      </button>

    </div>
  );
}

export default StudentCard;
