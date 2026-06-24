import styles from "./StudentSeat.module.css";

function StudentSeat({ aluno }) {

  return (

    <div className={styles.card}>

      <img
        src={`https://drive.google.com/thumbnail?id=${aluno.Foto_Id}&sz=w500`}
        alt={aluno.Nome}
        className={styles.photo}
      />

      <div className={styles.name}>
        {aluno.Nome}
      </div>

    </div>

  );

}

export default StudentSeat;
