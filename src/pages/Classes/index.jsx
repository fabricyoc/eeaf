import styles from "./Classes.module.css";

import Loading from "../../components/Loading";

import { useClasses } from "../../hooks/useClasses";
import HeaderDashboard from "../../components/HeaderDashboard";


function Classes() {

  const { classes, loading } = useClasses();

  if (loading) {
    return (
      <Loading
        text="Carregando turmas..."
      />
    );
  }

  return (

    <section className={styles.container}>

      <HeaderDashboard
        title="Minhas Turmas"
      />

      {
        classes.length === 0 ? (
          <div
            className={styles.emptyMessage}
          >
            Professor não alocado em nenhuma turma.
          </div>
        ) : (
          <div className={styles.grid}>
            {
              classes.map(turma => (
                <article
                  key={turma.id}
                  className={styles.card}
                >
                  <h2>{turma.nome}</h2>
                  <p>Ano: {turma.ano}</p>
                  <p>Turno: {turma.turno}</p>
                </article>
              ))
            }
          </div>
        )
      }

    </section>
  );
}
export default Classes;
