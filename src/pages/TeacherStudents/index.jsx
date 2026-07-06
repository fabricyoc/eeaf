import { useState } from "react";

import HeaderStudents from "../../components/HeaderStudents";
import StatsCards from "../../components/StatsCards";
import StudentGrid from "../../components/StudentGrid";
import Loading from "../../components/Loading";

import {
  useStudents
} from "../../contexts/StudentsContext";

import styles from "./TeacherStudents.module.css";

import StudentForm from "../../components/StudentForm";

function TeacherStudents() {
const [showForm,setShowForm] =
  useState(false);

  const {
    todosAlunos,
    loadingAlunos
  } = useStudents();

  const [alunos, setAlunos] =
    useState(todosAlunos);

  if (loadingAlunos) {
    return <Loading />;
  }

  return (

    <section
      className={styles.container}
    >

      {/* <HeaderStudents
        todosAlunos={todosAlunos}
        setAlunos={setAlunos}
        onNovoAluno={() => {
          console.log("Novo aluno");
        }}
      /> */}

      <HeaderStudents

  todosAlunos={todosAlunos}

  setAlunos={setAlunos}

  onNovoAluno={() =>
    setShowForm(true)
  }

/>

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
        alunos={
          alunos.length
            ? alunos
            : todosAlunos
        }
      />

{
 showForm && (

  <StudentForm

    onClose={() =>
      setShowForm(false)
    }

    onSuccess={()=>{
      window.location.reload();
    }}

  />

 )
}

    </section>

  );

}

export default TeacherStudents;
