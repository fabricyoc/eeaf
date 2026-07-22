import { useState } from "react";
import { toast } from "react-toastify";

import { useTeacherAssignments } from "./useTeacherAssignments";
import { useUsers } from "./useUsers";

import {
  createTeacherAssignment,
  deleteTeacherAssignment,
  getTurmas,
  getDisciplinasDisponiveisPorTurma
} from "../services/teacherAssignmentService";

import {
  initialTeacherAssignmentForm
} from "../components/teacherAssignments/constants";

export function useTeacherAssignmentPage() {

  const {
    assignments,
    loading,
    carregar
  } = useTeacherAssignments();

  const {
    users
  } = useUsers();

  const [modal, setModal] = useState(false);

  const [turmas, setTurmas] = useState([]);

  const [disciplinas, setDisciplinas] = useState([]);

  const [form, setForm] = useState(
    initialTeacherAssignmentForm
  );

  /* ==========================
     MODAL
  ========================== */

  async function abrirModal() {

    setForm(initialTeacherAssignmentForm);

    setDisciplinas([]);

    setModal(true);

    try {

      const data = await getTurmas();

      setTurmas(data);

    } catch {

      toast.error(
        "Erro ao carregar turmas."
      );

    }

  }

  function fecharModal() {

    setModal(false);

    setForm(initialTeacherAssignmentForm);

    setDisciplinas([]);

  }

  /* ==========================
     FORMULÁRIO
  ========================== */

  function alterarCampo(name, value) {

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "turma_id") {

      carregarDisciplinas(value);

    }

  }

  async function carregarDisciplinas(turmaId) {

    if (!turmaId) {

      setDisciplinas([]);

      setForm(prev => ({
        ...prev,
        disciplina_id: ""
      }));

      return;

    }

    try {

      const data =
        await getDisciplinasDisponiveisPorTurma(
          turmaId
        );

      setDisciplinas(data);

      setForm(prev => ({
        ...prev,
        disciplina_id: ""
      }));

    } catch {

      toast.error(
        "Erro ao carregar disciplinas."
      );

    }

  }

  /* ==========================
     CRUD
  ========================== */

  async function salvar() {

    if (

      !form.professor_id ||

      !form.turma_id ||

      !form.disciplina_id

    ) {

      toast.warning(
        "Preencha todos os campos."
      );

      return;

    }

    try {

      await createTeacherAssignment(form);

      toast.success(
        "Professor alocado com sucesso!"
      );

      await carregar();

      fecharModal();

    } catch (error) {

      toast.error(

        error.message ||

        "Erro ao alocar professor."

      );

    }

  }

  async function excluir(assignment) {

    try {

      await deleteTeacherAssignment(
        assignment.id
      );

      toast.success(
        "Alocação removida com sucesso!"
      );

      await carregar();

    } catch (error) {

      toast.error(

        error.message ||

        "Erro ao remover alocação."

      );

    }

  }

  return {

    /* lista */

    assignments,

    loading,

    carregar,

    /* usuários */

    users,

    /* modal */

    modal,

    abrirModal,

    fecharModal,

    /* formulário */

    form,

    alterarCampo,

    turmas,

    disciplinas,

    /* ações */

    salvar,

    excluir

  };

}