import { useMemo } from "react";
import styles from "./StatsCards.module.css";

function StatsCards({
  alunos,
  totalAlunos
}) {
  const estatisticasTurmas = useMemo(() => {
    const mapa = {};

    alunos.forEach((aluno) => {
      const turma = aluno.turma || "Sem turma";

      mapa[turma] = (mapa[turma] || 0) + 1;
    });

    return Object.entries(mapa)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([turma, quantidade]) => ({
        turma,
        quantidade,
      }));
  }, [alunos]);

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
        {estatisticasTurmas.map(({ turma, quantidade }) => (
          <div
            key={turma}
            className={styles.card}
          >
            <div className={styles.number}>
              {quantidade}
            </div>

            <div className={styles.label}>
              {turma.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StatsCards;
