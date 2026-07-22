import { useState } from "react";

const initialForm = {
  aluno_id: "",
  data_inicio: "",
  data_fim: "",
  turno: "",
  observacao: "",
};

function somenteData(data) {
  if (!data) {
    return "";
  }

  return data.substring(0, 10);
}

export function useAtestadoForm() {
  const [modal, setModal] = useState(false);

  const [atestadoSelecionado, setAtestadoSelecionado] = useState(null);

  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const [form, setForm] = useState(initialForm);

  function abrirNovo() {
    setAtestadoSelecionado(null);

    setAlunoSelecionado(null);

    setForm({ ...initialForm });

    setModal(true);
  }

  function editar(atestado) {
    setAtestadoSelecionado(atestado);

    setAlunoSelecionado(atestado.alunos || null);

    setForm({
      aluno_id: atestado.aluno_id,

      data_inicio: somenteData(atestado.data_inicio),

      data_fim: somenteData(atestado.data_fim),

      turno: atestado.turno || "",

      observacao: atestado.observacao || "",
    });

    setModal(true);
  }

  function fecharModal() {
    setModal(false);

    setAtestadoSelecionado(null);

    setAlunoSelecionado(null);

    setForm({ ...initialForm });
  }

  function alterarCampo(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function selecionarAluno(aluno) {
    if (!aluno) {
      setAlunoSelecionado(null);

      setForm((prev) => ({
        ...prev,
        aluno_id: "",
      }));

      return;
    }

    setAlunoSelecionado(aluno);

    setForm((prev) => ({
      ...prev,
      aluno_id: aluno.id,
    }));
  }

  function limparFormulario() {
    setAtestadoSelecionado(null);

    setAlunoSelecionado(null);

    setForm({ ...initialForm });
  }

  return {
    modal,
    form,
    atestadoSelecionado,
    alunoSelecionado,

    abrirNovo,
    editar,
    fecharModal,
    alterarCampo,
    selecionarAluno,
    limparFormulario,

    setModal,
    setForm,
    setAlunoSelecionado,
    setAtestadoSelecionado,
  };
}