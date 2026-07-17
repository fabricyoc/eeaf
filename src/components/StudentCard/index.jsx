import styles from "./StudentCard.module.css";

function StudentCard({
  aluno,
  onView,
  role
}) {

  const fotoUrl =
    aluno?.foto_id
      ? `https://drive.google.com/thumbnail?id=${aluno.foto_id}&sz=w1000`
      : "https://placehold.co/150x150?text=Sem+Foto";


  const podeVisualizar =
    // role === "teacher" ||
    role === "coordinator" ||
    role === "admin";


  return (

    <div className={styles.card}>


      <img
        className={styles.photo}
        src={fotoUrl}
        alt={aluno?.nome || "Aluno"}
        onError={(e) => {
          e.target.src =
            "https://placehold.co/150x150?text=Sem+Foto";
        }}
      />


      <h3 className={styles.name}>
        {aluno?.nome}
      </h3>


      <p className={styles.email}>
        {aluno?.email}
      </p>


      <p className={styles.classroom}>
        {
          aluno?.turma?.toUpperCase()
          ||
          "SEM TURMA"
        }
      </p>


      {
        podeVisualizar && (

          <button
            className={styles.button}
            onClick={() => onView(aluno)}
          >
            Ver Perfil
          </button>

        )
      }


    </div>

  );

}


export default StudentCard;
