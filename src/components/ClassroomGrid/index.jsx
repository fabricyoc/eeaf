import { useEffect, useState } from "react";

import StudentSeat from "../StudentSeat";

import styles from "./ClassroomGrid.module.css";

function ClassroomGrid({ turma }) {

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {

    carregarAlunos();

  }, [turma]);

  async function carregarAlunos() {

    const PLANILHA_ID =
      "1OZpgFfTynpQfKrrQt3GQVp86Yaat1VvKsJRsk3oYeHE";

    const resposta = await fetch(
      `https://opensheet.elk.sh/${PLANILHA_ID}/${turma}`
    );

    const dados = await resposta.json();

    setAlunos(dados);

  }

  return (

    <>
      <div className={styles.quadro}>
        QUADRO
      </div>

      <div className={styles.grid}>

        {
          alunos.map((aluno) => (
            <StudentSeat
              key={aluno.Posição}
              aluno={aluno}
            />
          ))
        }

      </div>

    </>

  );

}

export default ClassroomGrid;
