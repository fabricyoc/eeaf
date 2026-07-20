import styles from "./Disciplines.module.css";

import { useState } from "react";

import Loading from "../../components/Loading";
import HeaderDashboard from "../../components/HeaderDashboard";
import ProfileModal from "../../components/ui/ProfileModal";
import { FaBook, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDisciplines } from "../../hooks/useDisciplines";

import {
  createDisciplina,
  updateDisciplina,
  deleteDisciplina
} from "../../services/disciplineService";

const initialForm = {
  nome: "",
  codigo: "",
};

function Disciplines() {
  const {
    disciplines,
    loading,
    carregarDisciplinas
  } = useDisciplines();

  const [modalAberto, setModalAberto] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [disciplinaExcluir, setDisciplinaExcluir] = useState(null);
  const [form, setForm] = useState(initialForm);

  function abrirNova() {
    setDisciplinaSelecionada(null);

    setForm({
      ...initialForm
    });
    setModalAberto(true);
  }

  function abrirEditar(disciplina) {
    setDisciplinaSelecionada(disciplina);

    setForm({
      nome: disciplina.nome ?? "",
      codigo: disciplina.codigo ?? "",
    });

    setModalAberto(true);
  }

  function handleChange(name, value) {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function salvar() {

    try {
      if (disciplinaSelecionada) {
        await updateDisciplina(
          disciplinaSelecionada.id,
          form
        );
        toast.success("Disciplina atualizada!");
      }
      else {
        await createDisciplina(form);
        toast.success("Disciplina criada!");
      }

      await carregarDisciplinas();
      fecharModal();
    }

    catch (error) {
      console.error(
        "Erro ao salvar disciplina:",
        error
      );
      toast.error("Erro ao salvar disciplina.");
    }
  }

  function abrirExcluir(disciplina) {
    setDisciplinaExcluir(disciplina);
  }

  async function confirmarExclusao() {

    try {
      await deleteDisciplina(disciplinaExcluir.id);
      toast.success("Disciplina excluída!");

      await carregarDisciplinas();
      setDisciplinaExcluir(null);
    }
    catch (error) {

      console.error(error);
      toast.error("Erro ao excluir disciplina.");
    }
  }

  function fecharModal() {
    setModalAberto(false);
    setDisciplinaSelecionada(null);
    setForm({
      ...initialForm
    });
  }

  if (loading) {
    return (
      <Loading
        text="Carregando componentes curriculares..."
      />
    );
  }

  const campos = [
    {
      name: "nome",
      label: "Nome da disciplina"
    },

    {
      name: "codigo",
      label: "Código"
    }
  ];

  return (

    <section
      className={styles.container}
    >

      <HeaderDashboard
        title="Componentes Curriculares"
      >
        <button
          className={styles.button}
          onClick={abrirNova}
        >
          <FaPlus />
          Novo Componente Curricular
        </button>
      </HeaderDashboard>

      <div
        className={styles.grid}
      >

        {
          disciplines.map(
            disciplina => (
              <article
                key={disciplina.id}
                className={styles.card}
              >

                <div
                  className={styles.icon}
                >
                  <FaBook />
                </div>

                <div>
                  <h2>
                    {disciplina.nome}
                  </h2>
                  <p>
                    Código:
                    {" "}
                    {disciplina.codigo || "Sem código"}
                  </p>
                </div>

                <div
                  className={styles.actions}
                >
                  <button
                    className={styles.edit}
                    onClick={() =>
                      abrirEditar(disciplina)
                    }
                  >
                    Editar
                  </button>

                  <button
                    className={styles.delete}
                    onClick={() =>
                      abrirExcluir(disciplina)
                    }
                  >
                    Excluir
                  </button>
                </div>
              </article>
            )
          )
        }
      </div>

      {
        modalAberto && (
          <ProfileModal
            title={disciplinaSelecionada
              ? "Editar Disciplina"
              : "Nova Disciplina"
            }
            subtitle="Cadastro de componente curricular"
            icon={<FaBook />}
            form={form}
            fields={campos}
            readOnly={false}
            onChange={handleChange}
            onSave={salvar}
            onClose={fecharModal}
          />
        )
      }

      {
        disciplinaExcluir && (
          <ProfileModal
            title="Excluir disciplina"
            subtitle={
              `Deseja realmente excluir "${disciplinaExcluir.nome}"?`
            }
            icon={<FaBook />}
            form={{}}
            fields={[]}
            readOnly={true}
            showSaveButton={true}
            saveText="Excluir"
            closeText="Cancelar"
            onSave={
              confirmarExclusao
            }
            onClose={() =>
              setDisciplinaExcluir(null)
            }

          />
        )
      }
    </section>
  );
}
export default Disciplines;
