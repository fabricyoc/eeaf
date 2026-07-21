import styles from "./MedicalCertificates.module.css";

import {
  useState,
  useEffect
} from "react";

import {
  FaNotesMedical,
  FaPlus,
  FaTrash,
  FaEdit
} from "react-icons/fa";

import {
  toast
} from "react-toastify";

import Loading from "../../components/Loading";
import HeaderDashboard from "../../components/HeaderDashboard";
import DataTable from "../../components/ui/DataTable";
import SearchBar from "../../components/ui/SearchBar";
import ProfileModal from "../../components/ui/ProfileModal";
import StudentSearch from "../../components/ui/StudentSearch";

import {
  useAtestados
} from "../../hooks/useAtestados";

import {
  useRole
} from "../../hooks/useRole";

const SEARCH_FIELDS = [

  "alunos.nome",

  "alunos.turmas.nome",

  "turno",

  "data_inicio",

  "data_fim"

];

const initialForm = {

  aluno_id: "",

  data_inicio: "",

  data_fim: "",

  turno: "",

  observacao: ""

};

function somenteData(data) {

  if (!data) {
    return "";
  }

  return data.substring(0, 10);

}

function hoje() {

  return new Date()
    .toISOString()
    .substring(0, 10);

}

function MedicalCertificates() {

  const {
    canCreateCertificates,
    canEditCertificates,
    canDeleteCertificates,
    isSecretary,
    isCoordinator,
    isAdmin
  } = useRole();

  const {

    atestados,

    loading,

    salvarAtestado,

    excluirAtestado

  } = useAtestados();

  const [
    lista,
    setLista
  ] = useState([]);

  const [
    buscaAtiva,
    setBuscaAtiva
  ] = useState(false);

  const [
    modal,
    setModal
  ] = useState(false);

  const [
    atestadoSelecionado,
    setAtestadoSelecionado
  ] = useState(null);

  const [
    alunoSelecionado,
    setAlunoSelecionado
  ] = useState(null);

  const [
    form,
    setForm
  ] = useState(initialForm);

  useEffect(() => {

    setLista(atestados);

  }, [atestados]);

  function abrirNovo() {

    setAtestadoSelecionado(null);

    setAlunoSelecionado(null);

    setForm({

      ...initialForm

    });

    setModal(true);

  }

  function editar(atestado) {

    setAtestadoSelecionado(
      atestado
    );

    setAlunoSelecionado(
      atestado.alunos || null
    );

    setForm({

      aluno_id:
        atestado.aluno_id,

      data_inicio:
        somenteData(atestado.data_inicio),

      data_fim:
        somenteData(atestado.data_fim),

      turno:
        atestado.turno || "",

      observacao:
        atestado.observacao || ""

    });

    setModal(true);

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
    if (!canCreateCertificates) {

      toast.error(
        "Você não possui permissão para cadastrar atestados."
      );

      return;

    }

    if (
      !form.aluno_id ||
      !form.data_inicio ||
      !form.data_fim
    ) {

      toast.warning(
        "Informe aluno e período do atestado."
      );

      return;

    }
    if (
      form.data_fim < form.data_inicio
    ) {

      toast.warning(
        "A data final não pode ser anterior à data inicial."
      );

      return;

    }

    try {

      await salvarAtestado({

        ...form,

        id:
          atestadoSelecionado?.id

      });

      toast.success(

        atestadoSelecionado

          ?

          "Atestado atualizado!"

          :

          "Atestado cadastrado!"

      );

      fecharModal();

    } catch (error) {

      console.error(error);

      toast.error(
        "Erro ao salvar atestado"
      );

    }

  }

  async function excluir(atestado) {

    try {

      await excluirAtestado(

        atestado.id

      );

      toast.success(

        "Atestado removido!"

      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Erro ao excluir atestado"
      );

    }

  }

  function selecionarAluno(aluno) {

    if (!aluno) {

      setAlunoSelecionado(null);

      setForm(prev => ({

        ...prev,

        aluno_id: ""

      }));

      return;

    }

    setAlunoSelecionado(
      aluno
    );

    setForm(prev => ({

      ...prev,

      aluno_id:
        aluno.id

    }));

  }

  function fecharModal() {

    setModal(false);

    setAtestadoSelecionado(null);

    setAlunoSelecionado(null);

    setForm({

      ...initialForm

    });

  }

  if (loading) {

    return (

      <Loading

        text="Carregando atestados..."

      />

    );

  }

  const columns = [

    {
      key: "aluno",

      label: "Aluno(a)",

      render: (row) =>

        row.alunos?.nome?.toUpperCase()
        ||
        "-"

    },

    {
      key: "turma",

      label: "Turma",

      render: (row) =>

        row.alunos?.turmas?.nome?.toUpperCase()
        ||
        "-"

    },

    {
      key: "inicio",

      label: "Início",

      render: (row) =>

        somenteData(row.data_inicio)
          .split("-")
          .reverse()
          .join("/")

    },

    {
      key: "fim",

      label: "Fim",

      render: (row) =>

        somenteData(row.data_fim)
          .split("-")
          .reverse()
          .join("/")

    },

    {
      key: "turno",

      label: "Turno",

      render: (row) =>

        row.turno

          ?

          row.turno.toUpperCase()

          :

          "INTEGRAL"

    }

  ];

  const canShowActions =
  isSecretary ||
  isCoordinator ||
  isAdmin;

  return (

    <section

      className={styles.container}

    >

      <HeaderDashboard

        title="Atestados dos Alunos"

      >

        <SearchBar

          items={atestados}

          onSearch={setLista}

          setBuscaAtiva={setBuscaAtiva}

          fields={SEARCH_FIELDS}

          placeholder="Pesquisar aluno ou período"

        />

        {
          canCreateCertificates && (

            <button

              className={styles.button}

              onClick={abrirNovo}

            >

              <FaPlus />

              Novo Atestado

            </button>

          )
        }

      </HeaderDashboard>

      <div

        className={styles.content}

      >

        {

          buscaAtiva && lista.length === 0

            ?

            <div

              className={styles.empty}

            >

              Nenhum atestado encontrado.

            </div>

            :

            <DataTable

  columns={columns}

  data={lista}

  actions={
    canShowActions
      ?
      (row) => (
        <>
          {
            canEditCertificates && (
              <button
                className={styles.edit}
                onClick={() => editar(row)}
              >
                <FaEdit />
              </button>
            )
          }

          {
            canDeleteCertificates && (
              <button
                className={styles.delete}
                onClick={() => excluir(row)}
              >
                <FaTrash />
              </button>
            )
          }

        </>
      )
      :
      null
  }

/>

        }

      </div>

      {
        modal &&

        <ProfileModal

          title={
            atestadoSelecionado
              ?
              "Editar Atestado"
              :
              "Novo Atestado"
          }

          icon={<FaNotesMedical />}

          form={form}

          fields={[

            {
              name: "data_inicio",
              label: "Data inicial",
              type: "date",
              max: hoje()
            },

            {
              name: "data_fim",
              label: "Data final",
              type: "date",
              max: hoje()

            },

            {
              name: "turno",
              label: "Turno",
              type: "select",

              options: [

                {
                  value: "",
                  label: "Todos os turnos"
                },

                {
                  value: "manha",
                  label: "Manhã"
                },

                {
                  value: "tarde",
                  label: "Tarde"
                },

                {
                  value: "noite",
                  label: "Noite"
                }

              ]

            },

            {
              name: "observacao",
              label: "Observação",
              type: "textarea"
            }

          ]}

          onChange={alterarCampo}

          onSave={salvar}

          onClose={fecharModal}

        >

          <StudentSearch

            alunoSelecionado={
              alunoSelecionado
            }

            onSelect={
              selecionarAluno
            }

          />

        </ProfileModal>

      }

    </section>

  );

}

export default MedicalCertificates;
