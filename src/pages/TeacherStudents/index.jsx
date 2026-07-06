import { useState } from "react";

// import SearchBar from "../../components/SearchBar";
import HeaderStudents from "../../components/HeaderStudents";
import StatsCards from "../../components/StatsCards";
import StudentGrid from "../../components/StudentGrid";
import Loading from "../../components/Loading";

import {
  useStudents
} from "../../contexts/StudentsContext";

import styles from "./TeacherStudents.module.css";

function TeacherStudents() {

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

      {/* <SearchBar
        todosAlunos={todosAlunos}
        setAlunos={setAlunos}
      /> */}
      <HeaderStudents
  todosAlunos={todosAlunos}
  setAlunos={setAlunos}
  onNovoAluno={() => {
    console.log("Novo aluno");
  }}
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

    </section>

  );

}

export default TeacherStudents;
