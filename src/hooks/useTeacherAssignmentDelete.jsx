import { useState } from "react";
import { toast } from "react-toastify";

import {
  deleteTeacherAssignment
} from "../services/teacherAssignmentService";

export function useTeacherAssignmentDelete({
  carregar
}) {

  const [

    confirmOpen,

    setConfirmOpen

  ] = useState(false);

  const [

    assignmentSelecionada,

    setAssignmentSelecionada

  ] = useState(null);



  function solicitarExclusao(assignment) {

    setAssignmentSelecionada(assignment);

    setConfirmOpen(true);

  }



  function fecharConfirmacao() {

    setConfirmOpen(false);

    setAssignmentSelecionada(null);

  }



  async function confirmarExclusao() {

    if (!assignmentSelecionada) {

      return;

    }

    try {

      await deleteTeacherAssignment(
        assignmentSelecionada.id
      );

      toast.success(
        "Alocação removida com sucesso!"
      );

      await carregar();

      fecharConfirmacao();

    } catch (error) {

      toast.error(

        error.message ||

        "Erro ao remover alocação."

      );

    }

  }



  return {

    confirmOpen,

    assignmentSelecionada,

    solicitarExclusao,

    confirmarExclusao,

    fecharConfirmacao

  };

}