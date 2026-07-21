import { supabase } from "../utils/supabase";

/**
 * Busca todas as disciplinas
 * com suas turmas associadas
 */
export async function getDisciplines(){

  const {
    data,
    error
  } = await supabase

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

    .order(
      "nome",
      {
        ascending:true
      }
    );

  if(error){

    console.error(
      "Erro ao buscar disciplinas:",
      error
    );

    throw error;

  }

  return data || [];

}

/**
 * Cria disciplina
 */
export async function createDisciplina(
  dados
){

  const {
    data,
    error
  } = await supabase

    .from("disciplinas")

    .insert({

      nome:
        dados.nome
          .trim()
          .toUpperCase(),

      codigo:
        dados.codigo
          ?
          dados.codigo
            .trim()
            .toUpperCase()
          :
          null

    })

    .select()

    .single();

  if(error){

    console.error(
      "Erro ao criar disciplina:",
      error
    );

    throw error;

  }

  return data;

}

/**
 * Atualiza disciplina
 */
export async function updateDisciplina(
  id,
  dados
){

  const {
    data,
    error
  } = await supabase

    .from("disciplinas")

    .update({

      nome:
        dados.nome
          .trim()
          .toUpperCase(),

      codigo:
        dados.codigo
          ?
          dados.codigo
            .trim()
            .toUpperCase()
          :
          null

    })

    .eq(
      "id",
      id
    )

    .select()

    .single();

  if(error){

    console.error(
      "Erro ao atualizar disciplina:",
      error
    );

    throw error;

  }

  return data;

}

/**
 * Exclui disciplina
 * remove vínculos antes
 */
export async function deleteDisciplina(
  id
){

  const {
    error: erroVinculo
  } = await supabase

    .from("turma_disciplina")

    .delete()

    .eq(
      "disciplina_id",
      id
    );

  if(erroVinculo){

    console.error(
      "Erro ao remover vínculos:",
      erroVinculo
    );

    throw erroVinculo;

  }

  const {
    error
  } = await supabase

    .from("disciplinas")

    .delete()

    .eq(
      "id",
      id
    );

  if(error){

    console.error(
      "Erro ao excluir disciplina:",
      error
    );

    throw error;

  }

}

/**
 * Busca turmas associadas a uma disciplina
 */
export async function getTurmasDaDisciplina(
  disciplinaId
){

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

    .eq(
      "disciplina_id",
      disciplinaId
    );

  if(error){

    console.error(
      "Erro ao buscar turmas:",
      error
    );

    throw error;

  }

  return (

    data || []

  )

  .map(
    item =>
      item.turmas
  )

  .filter(Boolean);

}

/**
 * Salva as turmas associadas
 *
 * Remove associações antigas
 * e cria as novas
 */
export async function salvarTurmasDisciplina(
  disciplinaId,
  turmas
){

  const {
    error: erroDelete
  } = await supabase

    .from("turma_disciplina")

    .delete()

    .eq(
      "disciplina_id",
      disciplinaId
    );

  if(erroDelete){

    console.error(
      "Erro ao limpar turmas:",
      erroDelete
    );

    throw erroDelete;

  }

  if(
    !turmas ||
    turmas.length === 0
  ){

    return;

  }

  const registros = turmas.map(
    turmaId => ({

      disciplina_id:
        disciplinaId,

      turma_id:
        turmaId

    })
  );

  const {
    error
  } = await supabase

    .from("turma_disciplina")

    .insert(
      registros
    );

  if(error){

    console.error(
      "Erro ao salvar turmas:",
      error
    );

    throw error;

  }

}