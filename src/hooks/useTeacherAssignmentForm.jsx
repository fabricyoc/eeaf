import { useState } from "react";
import { toast } from "react-toastify";

import {
  createTeacherAssignment,
  getTurmas,
  getDisciplinasDisponiveisPorTurma
} from "../services/teacherAssignmentService";

import {
  initialTeacherAssignmentForm
} from "../components/teacherAssignments/constants";

export function useTeacherAssignmentForm({
  carregar
}) {

  const [modal, setModal] = useState(false);

  const [form, setForm] = useState(
    initialTeacherAssignmentForm
  );

  const [turmas, setTurmas] = useState([]);

  const [disciplinas, setDisciplinas] = useState([]);

  async function abrirModal() {

    setModal(true);

    setForm(initialTeacherAssignmentForm);

    setDisciplinas([]);

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

  async function salvar() {

    if (

      !form.professor_id ||

      !form.turma_id ||

      !form.disciplina_id

    ) {

      toast.warning(
        "Preencha todos os campos."
      );

      return false;

    }

    try {

      await createTeacherAssignment(form);

      toast.success(
        "Professor alocado com sucesso!"
      );

      await carregar();

      fecharModal();

      return true;

    } catch (error) {

      toast.error(

        error.message ||

        "Erro ao alocar professor."

      );

      return false;

    }

  }

  return {

    modal,

    abrirModal,

    fecharModal,

    form,

    alterarCampo,

    salvar,

    turmas,

    disciplinas

  };

}