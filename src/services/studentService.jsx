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
