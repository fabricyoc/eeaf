import { useEffect, useState } from "react";

import StatsCards from "../../components/StatsCards";
import StudentGrid from "../../components/StudentGrid";
import Loading from "../../components/Loading";
import StudentProfileModal from "../../components/StudentProfileModal";

import {
  useStudents
} from "../../contexts/StudentsContext";

import styles from "./Students.module.css";

import StudentForm from "../../components/StudentForm";

import { useRole } from "../../hooks/useRole";
import HeaderDashboard from "../../components/HeaderDashboard";
import SearchBarStudents from "../../components/ui/SearchBarStudents";
import ButtonNewStudent from "../../components/ui/ButtonNewStudent";

function Students() {
  const [showForm, setShowForm] =
    useState(false);

  const {
    todosAlunos,
    loadingAlunos,
    carregarTodosAlunos,
  } = useStudents();

  const [buscaAtiva, setBuscaAtiva] = useState(false);

  const {
    role,
    isTeacher,
    isCoordinator,
    isAdmin,
    hasRole,
  } = useRole();

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    setAlunos(todosAlunos);
  }, [todosAlunos]);


  const [alunoSelecionado, setAlunoSelecionado] =
    useState(null);

  if (loadingAlunos) {
    return <Loading text="Carregando estudantes..." />;
  }



  return (

    <section
      className={styles.container}
    >

      <HeaderDashboard
        title="Gerenciar Alunos"
      >
        <div className={styles.search_student}>
          <SearchBarStudents
            todosAlunos={todosAlunos}
            setAlunos={setAlunos}
            setBuscaAtiva={setBuscaAtiva}

          />
          <ButtonNewStudent
            onNovoAluno={() => setShowForm(true)}
          />
        </div>
      </HeaderDashboard>

      {
        buscaAtiva && alunos.length === 0 ? (

          <div className={styles.emptyMessage}>
            Nenhum estudante foi encontrado.
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
        onView={(aluno) => {
          setAlunoSelecionado(aluno);
        }}
        role={role}
      />

      {
        showForm && (

          <StudentForm

            onClose={() =>
              setShowForm(false)
            }

            onSuccess={() => {
              window.location.reload();
            }}

          />

        )
      }

      {
        alunoSelecionado && (
          <StudentProfileModal
            aluno={alunoSelecionado}
            onClose={() => setAlunoSelecionado(null)}
            onSuccess={async () => {
              await carregarTodosAlunos();
            }}
          />
        )
      }

    </section>

  );

}

export default Students;
