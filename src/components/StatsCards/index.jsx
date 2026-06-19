import styles from "./StatsCards.module.css";

function StatsCards({

  alunos,
  totalAlunos

}) {

  const turmas = [

    "1ST",
    "2ST",
    "3ST",

    "1SR",
    "2SR",
    "3SR",

    "6AEF",
    "7AEF",
    "8AEF",
    "9AEF"

  ];

  return (

    <>

      <div className={styles.summaryCards}>

        <div className={styles.summaryCard}>

          <div className={styles.number}>
            {totalAlunos}
          </div>

          <div className={styles.label}>
            Total de Alunos
          </div>

        </div>

        <div className={styles.summaryCard}>

          <div className={styles.number}>
            {alunos.length}
          </div>

          <div className={styles.label}>
            Resultado da Busca
          </div>

        </div>

      </div>

      <div className={styles.container}>

        {

          turmas.map((turma) => (

            <div
              key={turma}
              className={styles.card}
            >

              <div className={styles.number}>

                {

                  alunos.filter(

                    aluno =>
                      aluno.turma === turma

                  ).length

                }

              </div>

              <div className={styles.label}>
                {turma}
              </div>

            </div>

          ))

        }

      </div>

    </>

  );

}

export default StatsCards;