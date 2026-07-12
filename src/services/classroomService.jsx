import { supabase } from "../utils/supabase";

/**
 * Busca todos os alunos de uma turma
 */
export async function getAlunosByTurma(turmaId) {
  const { data, error } = await supabase
    .from("alunos")
    .select("id, nome, email, foto_id, posicao, turma_id")
    .eq("turma_id", turmaId)
    .order("posicao", { ascending: true });

  if (error) {
    console.error("Erro ao buscar alunos:", error);
    throw error;
  }

  return data || [];
}

/**
 * Atualiza posição de um aluno
 */
export async function updateAlunoPosicao(alunoId, posicao) {
  const { error } = await supabase
    .from("alunos")
    .update({ posicao })
    .eq("id", alunoId);

  if (error) {
    console.error("Erro ao atualizar posição:", error);
    throw error;
  }

  return true;
}

/**
 * Move aluno para uma posição vazia
 */
export async function moverAluno(alunoId, novaPosicao) {
  const { error } = await supabase
    .from("alunos")
    .update({
      posicao: novaPosicao,
    })
    .eq("id", alunoId);

  if (error) {
    console.error("Erro ao mover aluno:", error);
    throw error;
  }

  return true;
}

/**
 * Troca dois alunos de posição
 * (modo RPC recomendado)
 */
export async function swapAlunos(alunoA, alunoB) {
  // 🔥 Se você tiver a function no Postgres:
  const { error } = await supabase.rpc("swap_alunos", {
    aluno_a: alunoA.id,
    aluno_b: alunoB.id,
  });

  if (!error) return true;

  // 🔁 fallback caso RPC não exista
  console.warn("RPC swap_alunos não encontrada, usando fallback JS");

  const posA = alunoA.posicao;
  const posB = alunoB.posicao;

  const { error: errorA } = await supabase
    .from("alunos")
    .update({ posicao: posB })
    .eq("id", alunoA.id);

  if (errorA) throw errorA;

  const { error: errorB } = await supabase
    .from("alunos")
    .update({ posicao: posA })
    .eq("id", alunoB.id);

  if (errorB) throw errorB;

  return true;
}

/**
 * Busca todas as turmas
 */
export async function getTurmas() {
  const { data, error } = await supabase
    .from("turmas")
    .select("id, nome")
    .order("nome", { ascending: true });

  if (error) {
    console.error("Erro ao buscar turmas:", error);
    throw error;
  }

  return data || [];
}

/**
 * Busca todos os alunos
 */
export async function getTodosAlunos() {
  const { data, error } = await supabase
    .from("alunos")
    .select(`
      id,
      nome,
      matricula,
      email,
      foto_id,
      posicao,
      turma_id,
      turmas (
        id,
        nome
      )
    `)
    .order("nome", { ascending: true });

  if (error) {
    console.error("Erro ao buscar todos os alunos:", error);
    throw error;
  }

  return (data || []).map((aluno) => ({
    ...aluno,
    turma: aluno.turmas?.nome ?? "",
    foto_url: aluno.foto_id
      ? `https://drive.google.com/uc?export=view&id=${aluno.foto_id}`
      : null,
  }));
}