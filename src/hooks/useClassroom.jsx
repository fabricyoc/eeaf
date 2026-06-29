import { useCallback, useEffect, useState } from "react";

import {
  getAlunosByTurma,
  swapAlunos,
  moverAluno,
} from "../services/classroomService";

export function useClassroom(turmaId) {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * 🔄 Carrega alunos do banco
   */
  const carregarAlunos = useCallback(async () => {
    if (!turmaId) {
      setAlunos([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data = await getAlunosByTurma(turmaId);

      const alunosComFoto = data.map((aluno) => ({
        ...aluno,
        foto_url: aluno.foto_id
          ? `https://drive.google.com/thumbnail?id=${aluno.foto_id}&sz=w1000`
          : "https://placehold.co/300x300?text=Sem+Foto",
      }));

      setAlunos(alunosComFoto);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
      setAlunos([]);
    } finally {
      setLoading(false);
    }
  }, [turmaId]);

  /**
   * inicial load
   */
  useEffect(() => {
    carregarAlunos();
  }, [carregarAlunos]);

  /**
   * 🔁 TROCA ALUNO ↔ ALUNO (OTIMISTA)
   */
  async function trocarPosicoes(alunoA, alunoB) {
    try {
      await swapAlunos(alunoA, alunoB);

      // 🔥 atualização imediata na tela (SEM esperar reload)
      setAlunos((prev) =>
        prev.map((a) => {
          if (a.id === alunoA.id) {
            return { ...a, posicao: alunoB.posicao };
          }
          if (a.id === alunoB.id) {
            return { ...a, posicao: alunoA.posicao };
          }
          return a;
        })
      );

      return true;
    } catch (error) {
      console.error("Erro ao trocar posições:", error);
      return false;
    }
  }

  /**
   * ➜ MOVE PARA CADEIRA VAZIA (OTIMISTA)
   */
  async function moverParaPosicao(alunoId, novaPosicao) {
    try {
      await moverAluno(alunoId, novaPosicao);

      // 🔥 atualização imediata na tela
      setAlunos((prev) =>
        prev.map((a) =>
          a.id === alunoId
            ? { ...a, posicao: novaPosicao }
            : a
        )
      );

      return true;
    } catch (error) {
      console.error("Erro ao mover aluno:", error);
      return false;
    }
  }

  return {
    alunos,
    loading,
    carregarAlunos,
    trocarPosicoes,
    moverParaPosicao,
  };
}