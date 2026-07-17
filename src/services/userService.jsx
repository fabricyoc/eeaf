import { supabase } from "../utils/supabase";


/**
 * Busca usuários cadastrados
 */
export async function getUsers() {

  const {
    data,
    error
  } = await supabase
    .from("users")
    .select(`
      id,
      name,
      role,
      created_at
    `)
    .order(
      "created_at",
      {
        ascending:false
      }
    );


  if(error){

    console.error(
      "Erro ao buscar usuários:",
      error
    );

    throw error;

  }


  return data || [];

}



/**
 * Atualiza permissão do usuário
 */
export async function updateUserRole(
  id,
  role
){

  const {
    data,
    error
  } = await supabase
    .from("users")
    .update({
      role
    })
    .eq(
      "id",
      id
    )
    .select()
    .single();



  if(error){

    console.error(
      "Erro ao atualizar role:",
      error
    );

    throw error;

  }


  return data;

}
