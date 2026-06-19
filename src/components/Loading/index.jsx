import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p>Carregando alunos...</p>
    </div>
  );
}

export default Loading;
