import { supabase } from "../utils/supabase";

/**
 * Retorna todas as turmas vinculadas
 * a uma disciplina.
 */
export async function getTurmasDaDisciplina(
  disciplinaId
) {

  const {
    data,
    error
  } = await supabase
    .from("turma_disciplina")
    .select(`
      turma_id,
      turmas(
        id,
        nome
      )
    `)
    .eq("disciplina_id", disciplinaId);

  if (error) {
    throw error;
  }

  return (data || [])
    .map(item => item.turmas)
    .filter(Boolean);

}

/**
 * Atualiza as turmas vinculadas
 * a uma disciplina.
 *
 * Caso uma turma seja removida,
 * todas as alocações docentes
 * dessa disciplina naquela turma
 * também serão removidas.
 */
export async function salvarTurmasDisciplina(
  disciplinaId,
  turmas
) {

  /**
   * Busca as turmas atuais
   */
  const {
    data: atuais,
    error: erroBusca
  } = await supabase
    .from("turma_disciplina")
    .select("turma_id")
    .eq("disciplina_id", disciplinaId);

  if (erroBusca) {
    throw erroBusca;
  }

  const turmasAtuais =
    (atuais || []).map(
      item => item.turma_id
    );

  /**
   * Descobre quais turmas foram removidas
   */
  const turmasRemovidas =
    turmasAtuais.filter(
      turmaId => !turmas.includes(turmaId)
    );

  /**
   * Remove todas as alocações docentes
   * referentes às turmas removidas.
   */
  if (turmasRemovidas.length > 0) {

    const {
      error: erroProfessor
    } = await supabase
      .from("professor_turma_disciplina")
      .delete()
      .eq(
        "disciplina_id",
        disciplinaId
      )
      .in(
        "turma_id",
        turmasRemovidas
      );

    if (erroProfessor) {
      throw erroProfessor;
    }

  }

  /**
   * Remove todos os vínculos atuais
   */
  const {
    error: erroDelete
  } = await supabase
    .from("turma_disciplina")
    .delete()
    .eq(
      "disciplina_id",
      disciplinaId
    );

  if (erroDelete) {
    throw erroDelete;
  }

  /**
   * Caso não reste nenhuma turma,
   * finaliza aqui.
   */
  if (!turmas.length) {
    return;
  }

  /**
   * Recria os vínculos.
   */
  const registros =
    turmas.map(
      turmaId => ({
        disciplina_id: disciplinaId,
        turma_id: turmaId
      })
    );

  const {
    error: erroInsert
  } = await supabase
    .from("turma_disciplina")
    .insert(registros);

  if (erroInsert) {
    throw erroInsert;
  }

}