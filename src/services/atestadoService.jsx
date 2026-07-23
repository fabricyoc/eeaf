import { supabase } from "../utils/supabase";
/**
 * Busca todos os atestados
 */
export async function getAtestados() {
  const { data, error } = await supabase
    .from("atestados_com_usuario")
    .select(`
      id,
      aluno_id,
      cadastrado_por,
      nome_usuario,
      data_inicio,
      data_fim,
      turno,
      observacao,
      created_at,
      alunos(
        id,
        nome,
        turma_id,
        turmas(
          id,
          nome
        )
      )
    `)
    .order("data_inicio", {
      ascending: false
    });
  if (error) {
    console.error(
      "Erro ao buscar atestados:",
      error
    );
    throw error;
  }
  return (data ?? []).map(atestado => ({
    ...atestado,
    usuarioCadastro: {
      name:
        atestado.nome_usuario
    }
  }));
}
/**
 * Busca atestados de um aluno específico
 */
export async function getAtestadosByAluno(alunoId) {
  const { data, error } = await supabase
    .from("atestados")
    .select(`
      id,
      data_inicio,
      data_fim,
      turno,
      observacao
    `)
    .eq("aluno_id", alunoId)
    .order("data_inicio", {
      ascending: false
    });
  if (error) {
    console.error(
      "Erro ao buscar atestados do aluno:",
      error
    );
    throw error;
  }
  return data ?? [];
}
/**
 * Cria um novo atestado
 */
export async function createAtestado(dados) {
  const {
    data: {
      user
    }
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error(
      "Usuário não autenticado."
    );
  }
  const { data, error } = await supabase
    .from("atestados")
    .insert({
      aluno_id:
        dados.aluno_id,
      data_inicio:
        dados.data_inicio,
      data_fim:
        dados.data_fim,
      turno:
        dados.turno || null,
      observacao:
        dados.observacao || null,
      cadastrado_por:
        user.id
    })
    .select()
    .single();
  if (error) {
    console.error(
      "Erro ao criar atestado:",
      error
    );
    throw error;
  }
  return data;
}
/**
 * Atualiza um atestado
 */
export async function updateAtestado(
  id,
  dados
) {
  const { data, error } = await supabase
    .from("atestados")
    .update({
      aluno_id:
        dados.aluno_id,
      data_inicio:
        dados.data_inicio,
      data_fim:
        dados.data_fim,
      turno:
        dados.turno || null,
      observacao:
        dados.observacao || null
    })
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error(
      "Erro ao atualizar atestado:",
      error
    );
    throw error;
  }
  return data;
}
/**
 * Exclui um atestado
 */
export async function deleteAtestado(id) {
  const { error } = await supabase
    .from("atestados")
    .delete()
    .eq("id", id);
  if (error) {
    console.error(
      "Erro ao excluir atestado:",
      error
    );
    throw error;
  }
}