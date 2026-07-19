import { useEffect, useState } from "react";

// import HeaderStudents from "../../components/HeaderStudents";
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
    return <Loading />;
  }

  

  return (

    <section
      className={styles.container}
    >

      <HeaderDashboard
        title="Gerenciar Alunos"
      >
        <SearchBarStudents
          todosAlunos={todosAlunos}
          setAlunos={setAlunos}
        />
        <ButtonNewStudent
          onNovoAluno={() => setShowForm(true)}
        />
      </HeaderDashboard>

      <StatsCards
        alunos={
          alunos.length
            ? alunos
            : todosAlunos
        }
        totalAlunos={
          todosAlunos.length
        }
      />

      <StudentGrid
        alunos={alunos.length ? alunos : todosAlunos}
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
