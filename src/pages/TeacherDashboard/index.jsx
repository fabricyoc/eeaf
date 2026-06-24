import { Link } from "react-router-dom";

import {
  FaUsers,
  FaChalkboardTeacher
} from "react-icons/fa";

import styles from "./TeacherDashboard.module.css";

function TeacherDashboard() {

  return (

    <section
      className={styles.container}
    >

      <h1 className={styles.title}>
        Painel do Professor
      </h1>

      <div className={styles.cards}>

        <Link
          to="/teacher/students"
          className={styles.card}
        >

          <FaUsers
            className={styles.icon}
          />

          <h2>
            Gerenciar Alunos
          </h2>

          <p>
            Buscar alunos,
            visualizar perfis
            e estatísticas.
          </p>

        </Link>

        <Link
          to="/teacher/maps"
          className={styles.card}
        >

          <FaChalkboardTeacher
            className={styles.icon}
          />

          <h2>
            Mapas de Sala
          </h2>

          <p>
            Visualizar a
            disposição dos
            alunos em sala.
          </p>

        </Link>

      </div>

    </section>

  );

}

export default TeacherDashboard;
