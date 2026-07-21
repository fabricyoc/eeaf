import { supabase } from "../utils/supabase";


/**
 * Campos padrão de aluno
 */
const ALUNO_FIELDS = `
  id,
  matricula,
  nome,
  email,
  foto_id,
  posicao,
  turma_id,
  turmas (
    id,
    nome
  )
`;



/**
 * Busca todos os alunos
 */
export async function getAlunos() {


  const {
    data,
    error
  } = await supabase

    .from("alunos")

    .select(ALUNO_FIELDS)

    .order(
      "nome",
      {
        ascending: true
      }
    );



  if(error){

    console.error(
      "Erro ao buscar alunos:",
      error
    );

    throw error;

  }



  return (

    data || []

  ).map(aluno => ({

    ...aluno,

    turma:
      aluno.turmas?.nome || ""

  }));

}





/**
 * Busca um aluno pelo ID
 */
export async function getAlunoById(id) {


  const {
    data,
    error
  } = await supabase

    .from("alunos")

    .select(ALUNO_FIELDS)

    .eq(
      "id",
      id
    )

    .single();



  if(error){

    console.error(
      "Erro ao buscar aluno:",
      error
    );

    throw error;

  }



  return {

    ...data,

    turma:
      data.turmas?.nome || ""

  };

}





/**
 * Cadastrar aluno
 */
export async function createAluno(aluno) {


  const {
    data,
    error
  } = await supabase

    .from("alunos")

    .insert([
      aluno
    ])

    .select()

    .single();



  if(error){

    console.error(
      "Erro ao cadastrar aluno:",
      error
    );

    throw error;

  }



  return data;

}





/**
 * Atualizar aluno
 */
export async function updateAluno(
  id,
  aluno
) {


  const {
    data,
    error
  } = await supabase

    .from("alunos")

    .update({

      matricula:
        aluno.matricula,

      nome:
        aluno.nome,

      email:
        aluno.email,

      foto_id:
        aluno.foto_id,

      turma_id:
        aluno.turma_id,

      posicao:
        aluno.posicao

    })

    .eq(
      "id",
      id
    )

    .select()

    .single();



  if(error){

    console.error(
      "Erro ao atualizar aluno:",
      error
    );

    throw error;

  }



  return data;

}





/**
 * Excluir aluno
 */
export async function deleteAluno(id) {


  const {
    error
  } = await supabase

    .from("alunos")

    .delete()

    .eq(
      "id",
      id
    );



  if(error){

    console.error(
      "Erro ao excluir aluno:",
      error
    );

    throw error;

  }



  return true;

}





/**
 * Retorna a primeira posição livre da turma
 * considerando grid de 5 colunas
 */
export async function getUltimaPosicaoDisponivel(
  turmaId
) {


  const {
    data,
    error
  } = await supabase

    .from("alunos")

    .select("posicao")

    .eq(
      "turma_id",
      turmaId
    );



  if(error){

    throw error;

  }



  const ocupadas = (

    data || []

  )

    .map(
      aluno =>
        String(
          aluno.posicao
        )
    )

    .filter(Boolean);




  const colunas = 5;


  let linha = 1;



  while(true){


    for(
      let coluna = 1;
      coluna <= colunas;
      coluna++
    ){


      const posicao =
        `${linha}${coluna}`;



      if(
        !ocupadas.includes(posicao)
      ){

        return posicao;

      }


    }



    linha++;


  }


}





/**
 * Pesquisa alunos pelo nome
 * Usado no autocomplete de atestados
 */
export async function searchAlunos(
  nome
) {


  const termo =
    nome?.trim();



  if(
    !termo ||
    termo.length < 3
  ){

    return [];

  }




  const {
    data,
    error
  } = await supabase

    .from("alunos")

    .select(`

      id,

      matricula,

      nome,

      turma_id,

      turmas(
        id,
        nome
      )

    `)

    .ilike(
      "nome",
      `%${termo}%`
    )

    .order(
      "nome",
      {
        ascending:true
      }
    )

    .limit(10);




  if(error){

    console.error(
      "Erro ao pesquisar alunos:",
      error
    );

    throw error;

  }




  return (

    data || []

  )

  .map(aluno => ({


    id:
      aluno.id,


    matricula:
      aluno.matricula,


    nome:
      aluno.nome,


    turma_id:
      aluno.turma_id,


    turma:
      aluno.turmas?.nome || ""


  }));

}