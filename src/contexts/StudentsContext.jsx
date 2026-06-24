import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const StudentsContext =
  createContext();

export function StudentsProvider({
  children
}) {

  const [todosAlunos, setTodosAlunos] =
    useState([]);

  const [loadingAlunos, setLoadingAlunos] =
    useState(true);

  useEffect(() => {
    carregarTodosAlunos();
  }, []);

  async function carregarTodosAlunos() {

    try {

      setLoadingAlunos(true);

      const PLANILHA_ID =
        "1OZpgFfTynpQfKrrQt3GQVp86Yaat1VvKsJRsk3oYeHE";

      const ABAS = [
        "1ST",
        "2ST",
        "3ST"
        // "1SR",
        // "2SR",
        // "3SR",
        // "6AEF",
        // "7AEF",
        // "8AEF",
        // "9AEF"
      ];

      const promessas =
        ABAS.map(async (aba) => {

          const resposta =
            await fetch(
              `https://opensheet.elk.sh/${PLANILHA_ID}/${aba}`
            );

          const dados =
            await resposta.json();

          return dados.map(
            aluno => ({
              ...aluno,
              turma: aba
            })
          );

        });

      const resultado =
        await Promise.all(promessas);

      setTodosAlunos(
        resultado.flat()
      );

    } catch (erro) {

      console.error(erro);

    } finally {

      setLoadingAlunos(false);

    }

  }

  return (

    <StudentsContext.Provider
      value={{
        todosAlunos,
        loadingAlunos,
        carregarTodosAlunos
      }}
    >

      {children}

    </StudentsContext.Provider>

  );

}

export function useStudents() {

  return useContext(
    StudentsContext
  );

}
