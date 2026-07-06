import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  getTodosAlunos
} from "../services/classroomService";

const StudentsContext = createContext();

export function StudentsProvider({ children }) {
  const [todosAlunos, setTodosAlunos] = useState([]);
  const [loadingAlunos, setLoadingAlunos] = useState(true);

  useEffect(() => {
    carregarTodosAlunos();
  }, []);

  async function carregarTodosAlunos() {
    try {
      setLoadingAlunos(true);

      const alunos = await getTodosAlunos();

      setTodosAlunos(alunos);
    } catch (erro) {
      console.error("Erro ao carregar alunos:", erro);
      setTodosAlunos([]);
    } finally {
      setLoadingAlunos(false);
    }
  }

  return (
    <StudentsContext.Provider
      value={{
        todosAlunos,
        loadingAlunos,
        carregarTodosAlunos,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentsContext);
}