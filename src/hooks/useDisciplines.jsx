import {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  getDisciplines,
  createDisciplina,
  updateDisciplina,
  deleteDisciplina
} from "../services/disciplineService";

import {
  salvarTurmasDisciplina
} from "../services/turmaDisciplinaService";

export function useDisciplines() {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Carrega todas as disciplinas
   */
  const carregarDisciplinas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getDisciplines();
      setDisciplines(data);
    }
    catch (error) {

      console.error("Erro ao carregar disciplinas:", error);
      setError(error);
    }
    finally {
      setLoading(false);
    }
  }, []);

  /**
   * Salva ou atualiza disciplina
   */
  async function salvarDisciplina(dados) {
    if (dados.id) {
      await updateDisciplina(dados.id, dados);
    }
    else {
      await createDisciplina(dados);
    }
    await carregarDisciplinas();
  }

  /**
   * Exclui disciplina
   */
  async function excluirDisciplina(id) {
    await deleteDisciplina(id);
    await carregarDisciplinas();
  }

  /**
   * Atualiza vínculo disciplina x turma
   */
  async function atualizarTurmas(disciplinaId, turmas) {
    await salvarTurmasDisciplina(disciplinaId, turmas);
    await carregarDisciplinas();
  }

  useEffect(() => {
    carregarDisciplinas();
  }, [carregarDisciplinas]);

  return {
    disciplines,
    loading,
    error,
    carregarDisciplinas,
    salvarDisciplina,
    excluirDisciplina,
    atualizarTurmas
  };
}