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
      email,
      role,
      created_at
    `)
    .order(
      "created_at",
      {
        ascending: false
      }
    );

  if (error) {
    console.error(
      "Erro ao buscar usuários:",
      error
    );
    throw error;
  }

  return data || [];
}


/**
 * Atualiza dados do usuário
 */
export async function updateUser(
  id,
  dados
) {
  const {
    data,
    error
  } = await supabase
    .from("users")
    .update({
      name: dados.name?.trim().toUpperCase(),
      email: dados.email.trim().toLowerCase(),
      role: dados.role
    })
    .eq(
      "id",
      id
    )
    .select()
    .single();

  if (error) {
    console.error(
      "Erro ao atualizar usuário:",
      error
    );
    throw error;
  }

  return data;
}
