import { supabase } from "../utils/supabase";



/**
 * Busca disciplinas
 * 
 * Sem turmaId:
 * retorna todas as disciplinas cadastradas
 * 
 * Com turmaId:
 * retorna apenas disciplinas vinculadas à turma
 */
export async function getDisciplines(
  turmaId
){

  let query;


  if(turmaId){


    query = supabase

      .from("turma_disciplina")

      .select(`

        id,

        disciplinas (

          id,
          nome,
          codigo,
          created_at

        )

      `)

      .eq(
        "turma_id",
        turmaId
      );


  } else {


    query = supabase

      .from("disciplinas")

      .select(`

        id,
        nome,
        codigo,
        created_at

      `)

      .order(
        "nome",
        {
          ascending:true
        }
      );


  }



  const {
    data,
    error
  } = await query;



  if(error){

    console.error(
      "Erro ao buscar disciplinas:",
      error
    );

    throw error;

  }



  if(turmaId){

    return (
      data || []
    )
    .map(
      item => item.disciplinas
    )
    .filter(Boolean);

  }



  return data || [];

}





/**
 * Cria uma nova disciplina
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
          ? dados.codigo
              .trim()
              .toUpperCase()
          : null

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
 * Atualiza uma disciplina
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
          ? dados.codigo
              .trim()
              .toUpperCase()
          : null

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
 * Exclui uma disciplina
 */
export async function deleteDisciplina(
  id
){


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
 * Vincula uma disciplina a uma turma
 * 
 * Relação N:N
 * turma_disciplina
 */
export async function vincularDisciplinaTurma(
  turmaId,
  disciplinaId
){

  const {
    data,
    error
  } = await supabase

    .from("turma_disciplina")

    .insert({

      turma_id:
        turmaId,

      disciplina_id:
        disciplinaId

    })

    .select()

    .single();



  if(error){

    console.error(
      "Erro ao vincular disciplina:",
      error
    );

    throw error;

  }



  return data;

}






/**
 * Remove vínculo disciplina/turma
 */
export async function removerDisciplinaTurma(
  turmaId,
  disciplinaId
){


  const {
    error
  } = await supabase

    .from("turma_disciplina")

    .delete()

    .eq(
      "turma_id",
      turmaId
    )

    .eq(
      "disciplina_id",
      disciplinaId
    );



  if(error){

    console.error(
      "Erro ao remover vínculo:",
      error
    );

    throw error;

  }

}