import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({
  todosAlunos,
  setAlunos
}) {
  const [pesquisa, setPesquisa] = useState("");

  // Remove acentos e converte para minúsculas
  function normalizarTexto(texto) {
    return (
      texto
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") || ""
    );
  }

  function buscarAluno(e) {
    e.preventDefault();

    const termo = normalizarTexto(pesquisa.trim());

    // Campo vazio → mostra todos
    if (!termo) {
      setAlunos(todosAlunos);
      return;
    }

    // Divide a pesquisa em palavras
    const termos = termo
      .split(/\s+/)
      .filter(Boolean);

    const filtrados = todosAlunos.filter((aluno) => {
      const nome = normalizarTexto(aluno.nome);

      const turma = normalizarTexto(aluno.turma);

      // Junta nome + turma para pesquisar
      const textoBusca = `${nome} ${turma}`;

      // Todas as palavras digitadas devem existir
      return termos.every((palavra) =>
        textoBusca.includes(palavra)
      );
    });

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
        placeholder="Nome ou turma (Ex: Maria 2SR)"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
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
