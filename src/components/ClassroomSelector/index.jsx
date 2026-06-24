import styles from "./ClassroomSelector.module.css";

function ClassroomSelector({
  turmaSelecionada,
  setTurmaSelecionada
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
    <section className={styles.container}>

      <h2 className={styles.title}>
        Mapa da Sala
      </h2>

      <div className={styles.content}>

        <label
          htmlFor="turma"
          className={styles.label}
        >
          Selecione uma turma
        </label>

        <select
          id="turma"
          className={styles.select}
          value={turmaSelecionada}
          onChange={(e) =>
            setTurmaSelecionada(
              e.target.value
            )
          }
        >

          <option value="">
            Escolha uma turma
          </option>

          {
            turmas.map((turma) => (

              <option
                key={turma}
                value={turma}
              >
                {turma}
              </option>

            ))
          }

        </select>

      </div>

    </section>
  );
}

export default ClassroomSelector;
