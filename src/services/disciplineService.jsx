import { supabase } from "../utils/supabase";

/**
 * Busca todas as disciplinas
 * com suas turmas associadas
 */
export async function getDisciplines() {

  const { data, error } = await supabase
    .from("disciplinas")
    .select(`
      id,
      nome,
      codigo,
      created_at,
      turma_disciplina(
        turma_id,
        turmas(
          id,
          nome
        )
      )
    `)
    .order("nome", { ascending: true });

  if (error) {
    console.error("Erro ao buscar disciplinas:", error);
    throw error;
  }

  return data || [];
}

/**
 * Busca uma disciplina pelo ID
 */
export async function getDisciplinaById(id) {
  const { data, error } = await supabase
    .from("disciplinas")
    .select(`
      id,
      nome,
      codigo,
      created_at
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Erro ao buscar disciplina:", error);
    throw error;
  }

  return data;
}

/**
 * Cria uma disciplina
 */
export async function createDisciplina(dados) {

  const { data, error } = await supabase
    .from("disciplinas")
    .insert({
      nome: dados.nome.trim().toUpperCase(),
      codigo: dados.codigo ?
        dados.codigo.trim().toUpperCase()
        : null
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar disciplina:", error);
    throw error;
  }

  return data;
}

/**
 * Atualiza uma disciplina
 */
export async function updateDisciplina(id, dados) {

  const { data, error } = await supabase
    .from("disciplinas")
    .update({
      nome: dados.nome.trim().toUpperCase(),
      codigo: dados.codigo
        ? dados.codigo.trim().toUpperCase()
        : null
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar disciplina:", error);
    throw error;
  }

  return data;
}

/**
 * Verifica se uma disciplina
 * está vinculada a professores
 */
export async function verificarDisciplinaEmUso(id) {

  const { data, error } = await supabase
    .from("professor_turma_disciplina")
    .select("id")
    .eq("disciplina_id", id)
    .limit(1);

  if (error) {
    console.error("Erro ao verificar vínculo:", error);
    throw error;
  }

  return (
    data &&
    data.length > 0
  );
}

/**
 * Exclui uma disciplina
 *
 * Impede exclusão caso existam
 * professores vinculados
 */
export async function deleteDisciplina(id) {

  const usada = await verificarDisciplinaEmUso(id);

  if (usada) {
    throw new Error(
      "Não é possível excluir esta disciplina, pois existem professores alocados. Remova as alocações docentes antes de excluir."
    );
  }

  const { error } = await supabase
    .from("disciplinas")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro ao excluir disciplina:", error);

    throw error;

  }

}