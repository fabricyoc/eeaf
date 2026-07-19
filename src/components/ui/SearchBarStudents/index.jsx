import { useEffect, useState } from "react";
import styles from "./SearchBarStudents.module.css";

function SearchBarStudents({ todosAlunos, setAlunos, setBuscaAtiva }) {
  const [pesquisa, setPesquisa] = useState("");

  function normalizarTexto(texto) {
    return (
      texto
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") || ""
    );
  }

useEffect(() => {
  const termo = normalizarTexto(pesquisa.trim());

  // Menos de 1 caracteres → mostra todos
  if (termo.length < 1) {
    setAlunos(todosAlunos);
    setBuscaAtiva(false);
    return;
  }

  setBuscaAtiva(true);

  const termos = termo.split(/\s+/).filter(Boolean);

  const filtrados = todosAlunos.filter((aluno) => {
    const nome = normalizarTexto(aluno.nome);
    const turma = normalizarTexto(aluno.turma);

    const textoBusca = `${nome} ${turma}`;

    return termos.every((palavra) =>
      textoBusca.includes(palavra)
    );
  });

  setAlunos(filtrados);

}, [
  pesquisa,
  todosAlunos,
  setAlunos,
  setBuscaAtiva
]);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Nome ou turma (Ex: Maria 2SR)"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
    </div>
  );
}

export default SearchBarStudents;
