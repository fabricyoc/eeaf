import { useMemo, useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { toast } from "react-toastify";

import { useClassroom } from "../../hooks/useClassroom";

import SeatCard from "../SeatCard";
import PrintHeader from "../PrintHeader";
import PrintClassroomButton from "../PrintClassroomButton";

import styles from "./ClassroomMap.module.css";

function ClassroomMap({ turmaId, turmaNome }) {
  
  const {
    alunos,
    loading,
    trocarPosicoes,
    moverParaPosicao,
  } = useClassroom(turmaId);

  const [toastMostrado, setToastMostrado] = useState(false);

  /**
   * Toast responsivo
   */
  useEffect(() => {
    function verificarTela() {
      const pequeno = window.innerWidth < 768;

      if (pequeno && !toastMostrado) {
        toast.warn(
          "Em telas pequenas o mapa pode ficar comprometido. Exporte o PDF para melhor visualização.",
          { position: "top-right", autoClose: 5000 }
        );

        setToastMostrado(true);
      }
    }

    verificarTela();

    window.addEventListener("resize", verificarTela);

    return () =>
      window.removeEventListener("resize", verificarTela);
  }, [toastMostrado]);

  /**
   * Gera grade 5x5
   */
  const mapa = useMemo(() => {
    const linhas = 5;
    const colunas = 5;

    const grid = [];

    for (let l = linhas; l >= 1; l--) {
      for (let c = 1; c <= colunas; c++) {
        const posicao = `${l}${c}`;

        const aluno = alunos.find(
          (a) => String(a.posicao) === posicao
        );

        grid.push({ posicao, aluno });
      }
    }

    return grid;
  }, [alunos]);

  /**
   * DRAG END
   */
  async function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const posicaoOrigem = active.id;
    const posicaoDestino = over.id;

    const alunoOrigem = alunos.find(
      (a) => String(a.posicao) === posicaoOrigem
    );

    const alunoDestino = alunos.find(
      (a) => String(a.posicao) === posicaoDestino
    );

    try {
      // aluno → aluno (troca)
      if (alunoOrigem && alunoDestino) {
        await trocarPosicoes(alunoOrigem, alunoDestino);
      }

      // ➜ aluno → cadeira vazia
      if (alunoOrigem && !alunoDestino) {
        await moverParaPosicao(
          alunoOrigem.id,
          posicaoDestino
        );
      }

      toast.success("Mapa atualizado!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar mapa.");
    }
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>

      {/* HEADER (somente PDF + print) */}
      <div className={styles.printHeader}>
        <PrintHeader turma={turmaNome.toUpperCase()} />
      </div>

      {/* BOTÃO EXPORT PDF */}
      <div className={styles.actions}>
        <PrintClassroomButton
          alunos={alunos}
          turma={turmaNome.toUpperCase()}
        />
      </div>

      {/* MAPA */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.grid}>
          {mapa.map((item) => (
            <SeatCard
              key={item.posicao}
              id={item.posicao}
              aluno={item.aluno}
              posicao={item.posicao}
            />
          ))}
        </div>
      </DndContext>

      {/* QUADRO */}
      <div className={styles.quadro}>
        QUADRO
      </div>

    </div>
  );
}

export default ClassroomMap;
