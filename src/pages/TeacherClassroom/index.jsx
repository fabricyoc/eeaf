import { useState } from "react";

import Loading from "../../components/Loading";

import ClassroomSelector
  from "../../components/ClassroomSelector";

import ClassroomMap
  from "../../components/ClassroomMap";

import {
  useStudents
} from "../../contexts/StudentsContext";

import styles from "./TeacherClassroom.module.css";

function TeacherClassroom() {

  const {
    todosAlunos,
    loadingAlunos
  } = useStudents();

  const [
    turmaSelecionada,
    setTurmaSelecionada
  ] = useState("");

  if (loadingAlunos) {
    return <Loading />;
  }

  const alunosDaTurma =
    todosAlunos.filter(

      aluno =>
        aluno.turma ===
        turmaSelecionada

    );

  return (

    <section
      className={styles.container}
    >

      <ClassroomSelector
        turmaSelecionada={
          turmaSelecionada
        }
        setTurmaSelecionada={
          setTurmaSelecionada
        }
      />
      {

        turmaSelecionada && (

          <ClassroomMap
            alunos={
              alunosDaTurma
            }
            turma={turmaSelecionada}
          />

        )

      }

    </section>

  );

}

export default TeacherClassroom;
