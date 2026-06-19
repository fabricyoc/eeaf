import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({
  todosAlunos,
  setAlunos
}) {

  const [pesquisa, setPesquisa] =
    useState("");

  function buscarAluno(e) {

    e.preventDefault();

    if (!pesquisa.trim()) {

      setAlunos(todosAlunos);

      return;

    }

    const filtrados =
      todosAlunos.filter(

        aluno =>

          aluno.Nome &&

          aluno.Nome
            .toLowerCase()
            .includes(
              pesquisa.toLowerCase()
            )

      );

    setAlunos(filtrados);

  }

  return (

    <form
      className={styles.container}
      onSubmit={buscarAluno}
    >

      <input
        className={styles.input}
        type="text"
        placeholder="Digite o nome do aluno"
        value={pesquisa}
        onChange={(e) =>
          setPesquisa(e.target.value)
        }
      />

      <button
        type="submit"
        className={styles.button}
      >
        Buscar
      </button>

    </form>

  );

}

export default SearchBar;
