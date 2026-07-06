import { supabase } from "../utils/supabase";


/**
 * Cadastrar aluno
 */
export async function createAluno(aluno) {

  const { data, error } =
    await supabase
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
 * 
 * @param {última posição disponível} turmaId 
 * @returns 
 */
export async function getUltimaPosicaoDisponivel(turmaId) {

  const { data, error } = await supabase
    .from("alunos")
    .select("posicao")
    .eq("turma_id", turmaId);


  if(error) throw error;


  const ocupadas =
    data
      .map(a => String(a.posicao))
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


      if(!ocupadas.includes(posicao)){
        return posicao;
      }

    }


    linha++;

  }

}