import styles from "./PrintHeader.module.css";
import cabecalho from "./cabecalho.png";

function PrintHeader({ turma }) {

  return (
    <div className={styles.header}>

      <img
        src={cabecalho}
        alt="Cabeçalho EEAF"
        className={styles.cabecalho}
      />

      <div>

        <p>
          Mapa de Sala - {turma}
        </p>

      </div>

    </div>
  );

}

export default PrintHeader;
