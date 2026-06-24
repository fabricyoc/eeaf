import { useMemo, useEffect, useState } from "react";

import PrintHeader from "../PrintHeader";
import PrintClassroomButton from "../PrintClassroomButton";

import styles from "./ClassroomMap.module.css";

function ClassroomMap({
  alunos = [],
  turma = "",
}) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    function verificarTela() {
      setMobile(window.innerWidth < 900);
    }

    verificarTela();
    window.addEventListener("resize", verificarTela);

    return () =>
      window.removeEventListener("resize", verificarTela);
  }, []);

  const mapa = useMemo(() => {
    const linhas = 5;
    const colunas = 5;

    const grid = [];

    for (let linha = linhas; linha >= 1; linha--) {
      for (let coluna = 1; coluna <= colunas; coluna++) {

        const posicao = `${linha}${coluna}`;

        const aluno = alunos.find(
          (a) => String(a["Posição"]).trim() === posicao
        );

        grid.push({
          posicao,
          aluno,
        });

      }
    }

    return grid;
  }, [alunos]);

  return (
    <div className={styles.container}>

      {/* HEADER VISUAL (TELA) */}
      <div className={styles.printHeader}>
        <PrintHeader turma={turma} />
      </div>

      {/* BOTÃO PDF */}
      <div className={styles.actions}>
        <PrintClassroomButton
          alunos={alunos}
          turma={turma}
        />
      </div>

      {/* ALERTA MOBILE */}
      {mobile && (
        <div className={styles.alerta}>
          ⚠️ Visualização pode ficar comprometida em telas pequenas.
        </div>
      )}

      {/* MAPA VISUAL (SÓ SITE) */}
      <div className={styles.gridWrapper}>
        <div className={styles.grid}>

          {mapa.map((item) => (
            <div key={item.posicao} className={styles.carteira}>

              {item.aluno ? (
                <>
                  <img
                    className={styles.foto}
                    src={`https://drive.google.com/thumbnail?id=${item.aluno.Foto_Id}&sz=w1000`}
                    alt={item.aluno.Nome}
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/150x150?text=Sem+Foto";
                    }}
                  />

                  <div className={styles.nome}>
                    {item.aluno.Nome}
                  </div>

                  <div className={styles.posicao}>
                    {item.posicao}
                  </div>
                </>
              ) : (
                <div className={styles.vazia}>Livre</div>
              )}

            </div>
          ))}

        </div>
      </div>

      <div className={styles.quadro}>
        QUADRO
      </div>

    </div>
  );
}

export default ClassroomMap;
