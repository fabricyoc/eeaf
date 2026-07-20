import {
  useCallback,
  useEffect,
  useState
} from "react";

import StatsCards from "../../components/StatsCards";
import StudentGrid from "../../components/StudentGrid";
import Loading from "../../components/Loading";
import StudentProfileModal from "../../components/StudentProfileModal";
import StudentForm from "../../components/StudentForm";

import { useStudents } from "../../contexts/StudentsContext";

import { useRole } from "../../hooks/useRole";

import HeaderDashboard from "../../components/HeaderDashboard";
import ButtonNewStudent from "../../components/ui/ButtonNewStudent";
import SearchBar from "../../components/ui/SearchBar";

import styles from "./Students.module.css";

const STUDENT_SEARCH_FIELDS = [
  "nome",
  "turma"
];

function Students() {
  const [showForm, setShowForm] = useState(false);
  const {
    todosAlunos,
    loadingAlunos,
    carregarTodosAlunos
  } = useStudents();
  const [alunos, setAlunos] = useState([]);
  const [buscaAtiva, setBuscaAtiva] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const { role } = useRole();

  /*
    Mantém a lista exibida sincronizada
    com o contexto
  */
  useEffect(() => {
    setAlunos(todosAlunos);
  }, [todosAlunos]);

  /*
    Callback estável para o SearchBar
  */
  const handleSearch = useCallback(
    (resultado) => {
      setAlunos(resultado);
    }, []
  );

  if (loadingAlunos) {
    return (
      <Loading
        text="Carregando estudantes..."
      />
    );
  }

  return (
    <section
      className={styles.container}
    >

      <HeaderDashboard
        title="Gerenciar Alunos"
      >
        <div
          className={styles.search_student}
        >
          <SearchBar
            items={todosAlunos}
            onSearch={handleSearch}
            setBuscaAtiva={setBuscaAtiva}
            fields={STUDENT_SEARCH_FIELDS}
            placeholder="Nome ou turma (Ex: Maria 2SR)"
          />

          <ButtonNewStudent
            onNovoAluno={() =>
              setShowForm(true)
            }
          />
        </div>
      </HeaderDashboard>

      {
        buscaAtiva && alunos.length === 0 ? (
          <div
            className={styles.emptyMessage}
          >
            Nenhum estudante encontrado.
          </div>
        ) : (
          <StatsCards
            alunos={alunos}
            totalAlunos={todosAlunos.length}
          />

        )
      }

      <StudentGrid
        alunos={alunos}
        onView={(aluno) =>
          setAlunoSelecionado(aluno)
        }
        role={role}
      />

      {
        showForm && (
          <StudentForm
            onClose={() =>
              setShowForm(false)
            }
            onSuccess={async () => {
              setShowForm(false);
              await carregarTodosAlunos();
            }}
          />
        )
      }

      {
        alunoSelecionado && (
          <StudentProfileModal
            aluno={alunoSelecionado}
            onClose={() =>
              setAlunoSelecionado(null)
            }
            onSuccess={async () => {
              await carregarTodosAlunos();
              setAlunoSelecionado(null);
            }}
          />
        )
      }
    </section>
  );
}

export default Students;
