import { supabase } from "../utils/supabase";
import { getCurrentUser } from "./authService";

/**
 * Busca turmas conforme o perfil do usuário
 */
export async function getClasses(role) {

  // ==========================
  // ADMIN / COORDENADOR
  // ==========================

  if (
    role === "admin" ||
    role === "coordinator"
  ) {

    const {
      data,
      error
    } = await supabase
      .from("turmas")
      .select(`
        id,
        nome,
        ano,
        turno
      `)
      .order("nome");

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  // ==========================
  // PROFESSOR
  // ==========================

  if (role === "teacher") {

    const user = await getCurrentUser();

    const {
      data,
      error
    } = await supabase
      .from("professor_turma_disciplina")
      .select(`
        turma_id,

        turmas (
          id,
          nome,
          ano,
          turno
        ),

        disciplinas (
          id,
          nome,
          codigo
        )
      `)
      .eq("professor_id", user.id);

    if (error) {
      throw error;
    }

    const turmas = new Map();

    data.forEach(item => {

      const turma = item.turmas;
      const disciplina = item.disciplinas;

      if (!turma) {
        return;
      }

      if (!turmas.has(turma.id)) {

        turmas.set(turma.id, {

          ...turma,

          disciplinas: [],

          totalDisciplinas: 0

        });

      }

      const turmaAtual = turmas.get(turma.id);

      if (disciplina) {

        turmaAtual.disciplinas.push({

          id: disciplina.id,

          nome: disciplina.nome,

          codigo: disciplina.codigo

        });

      }

    });

    return Array.from(turmas.values()).map(turma => ({

      ...turma,

      totalDisciplinas: turma.disciplinas.length

    }));

  }

  return [];

}