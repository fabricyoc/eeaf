import { supabase } from "../utils/supabase";

/**
 * Cria uma nova conta
 */
export async function signUp({
  nome,
  email,
  senha,
}) {
  const nomeFormatado = nome.trim().toUpperCase();
  const emailFormatado = email.trim().toLowerCase();

  // Cria usuário no Auth
  const {
    data,
    error,
  } = await supabase.auth.signUp({
    email: emailFormatado,
    password: senha,
  });

  if (error) {
    throw error;
  }

  // Salva dados adicionais
  const {
    error: insertError,
  } = await supabase
    .from("users")
    .insert({
      id: data.user.id,
      name: nomeFormatado,
      email: emailFormatado,
      role: "common",
    });

  if (insertError) {
    throw insertError;
  }

  // Faz logout após o cadastro
  await supabase.auth.signOut();

  return data.user;
}

/**
 * Login
 */
export async function signIn({
  email,
  senha,
}) {
  const {
    data,
    error,
  } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password: senha,
  });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Logout
 */
export async function signOut() {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

/**
 * Usuário autenticado
 */
export async function getCurrentUser() {
  const {
    data,
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return data.user;
}

/**
 * Sessão atual
 */
export async function getSession() {
  const {
    data,
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

/**
 * Recuperação de senha
 */
export async function resetPassword(email) {
  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase()
    );

  if (error) {
    throw error;
  }
}

/**
 * Atualiza senha do usuário autenticado
 */
export async function updatePassword(
  novaSenha
) {
  const { error } =
    await supabase.auth.updateUser({
      password: novaSenha,
    });

  if (error) {
    throw error;
  }
}