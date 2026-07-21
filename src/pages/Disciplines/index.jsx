import {
  useState
} from "react";
import styles from "./Disciplines.module.css";
import {
  FaBook,
  FaPlus,
  FaUsers
} from "react-icons/fa";
import {
  toast
} from "react-toastify";
import Loading from "../../components/Loading";
import HeaderDashboard from "../../components/HeaderDashboard";
import ProfileModal from "../../components/ui/ProfileModal";
import DataTable from "../../components/ui/DataTable";
import {
  useDisciplines
} from "../../hooks/useDisciplines";
import {
  createDisciplina,
  updateDisciplina,
  deleteDisciplina,
  salvarTurmasDisciplina
} from "../../services/disciplineService";
import ClassroomCheckboxSelector from "../../components/ClassroomCheckboxSelector";
const initialForm = {
  nome: "",
  codigo: ""
};
function Disciplines() {
  const {
    disciplines,
    loading,
    carregarDisciplinas
  } = useDisciplines();
  const [
    modal,
    setModal
  ] = useState(false);
  const [
    turmaModal,
    setTurmaModal
  ] = useState(false);
  const [
    disciplinaSelecionada,
    setDisciplinaSelecionada
  ] = useState(null);
  const [
    form,
    setForm
  ] = useState(initialForm);
  const [
    turmasSelecionadas,
    setTurmasSelecionadas
  ] = useState([]);
  function abrirNova() {
    setDisciplinaSelecionada(null);
    setForm(
      initialForm
    );
    setModal(true);
  }
  function editar(disciplina) {
    setDisciplinaSelecionada(
      disciplina
    );
    setForm({
      nome: disciplina.nome,
      codigo: disciplina.codigo || ""
    });
    setModal(true);
  }
  function abrirTurmas(disciplina) {
    setDisciplinaSelecionada(
      disciplina
    );
    const ids =
      disciplina.turma_disciplina?.map(
        item => item.turma_id
      ) || [];
    setTurmasSelecionadas(ids);
    setTurmaModal(true);
  }
  function alterarCampo(
    name,
    value
  ) {
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
        toast.success(
          "Disciplina atualizada!"
        );
      }
      else {
        await createDisciplina(
          form
        );
        toast.success(
          "Disciplina criada!"
        );
      }
      carregarDisciplinas();
      setModal(false);
    } catch (error) {
      console.error(error);
      toast.error(
        "Erro ao salvar disciplina"
      );
    }
  }
  async function salvarTurmas() {
    try {
      await salvarTurmasDisciplina(
        disciplinaSelecionada.id,
        turmasSelecionadas
      );
      toast.success(
        "Turmas atualizadas!"
      );
      carregarDisciplinas();
      setTurmaModal(false);
    } catch (error) {
      console.error(error);
      toast.error(
        "Erro ao vincular turmas"
      );
    }
  }
  async function excluir(
    disciplina
  ) {
    try {
      await deleteDisciplina(
        disciplina.id
      );
      toast.success(
        "Disciplina removida!"
      );
      carregarDisciplinas();
    } catch (error) {
      toast.error(
        "Erro ao excluir"
      );
    }
  }
  if (loading) {
    return (
      <Loading
        text="Carregando componentes curriculares..."
      />
    );
  }
  const columns = [
    {
      key: "nome",
      label: "Disciplina"
    },
    {
      key: "codigo",
      label: "Código"
    },
    {
      key: "turmas",
      label: "Turmas",
      render: (disciplina) => (
        disciplina.turma_disciplina?.length
          ?
          disciplina.turma_disciplina
            .map(
              t => t.turmas.nome
            )
            .join(", ")
          :
          "Sem turma"
      )
    }
  ];
  return (
    <section className={styles.container}>
      <HeaderDashboard
        title="Componentes Curriculares"
      >
        <button
          className={styles.button}
          onClick={abrirNova}
        >
          <FaPlus />
          Nova Disciplina
        </button>
      </HeaderDashboard>
      <DataTable
        columns={columns}
        data={disciplines}
        actions={
          (disciplina) => (
            <>
              <button
                className={styles.edit}
                onClick={() => editar(disciplina)}
              >
                Editar
              </button>
              <button
                className={styles.edit}
                onClick={() => abrirTurmas(disciplina)}
              >
                <FaUsers />
                Turmas
              </button>
              <button
                className={styles.delete}
                onClick={() => excluir(disciplina)}
              >
                Excluir
              </button>
            </>
          )
        }
      />
      {
        modal &&
        <ProfileModal
          title={
            disciplinaSelecionada
              ?
              "Editar disciplina"
              :
              "Nova disciplina"
          }
          icon={<FaBook />}
          form={form}
          fields={[
            {
              name: "nome",
              label: "Nome"
            },
            {
              name: "codigo",
              label: "Código"
            }
          ]}
          onChange={alterarCampo}
          onSave={salvar}
          onClose={() => setModal(false)}
        />
      }
      {
        turmaModal &&
        <ProfileModal
          title="Associar turmas"
          subtitle={
            disciplinaSelecionada.nome
          }
          icon={<FaUsers />}
          form={{}}
          fields={[]}
          onSave={salvarTurmas}
          saveText="Salvar turmas"
          onClose={() => setTurmaModal(false)}
        >
          <ClassroomCheckboxSelector

turmasSelecionadas={
  turmasSelecionadas
}


setTurmasSelecionadas={
  setTurmasSelecionadas
}

/>
        </ProfileModal>
      }
    </section>
  );
}
export default Disciplines;