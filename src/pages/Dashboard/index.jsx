import { Link } from "react-router-dom";

import {
  FaUsers,
  FaMapMarkerAlt,
  FaChalkboardTeacher,
  FaUserCog,
} from "react-icons/fa";

import { useRole } from "../../hooks/useRole";

import styles from "./Dashboard.module.css";


function Dashboard() {


  const {
    role,
    canAccessCoordinator,
  } = useRole();



  const roleLabel = {

    common: "Comum",

    teacher: "Professor",

    coordinator: "Coordenador",

    admin: "Administrador",

  };



  return (

    <section
      className={styles.container}
    >


      <h1
        className={styles.title}
      >

        Painel do {
          roleLabel[role] || "Usuário"
        }

      </h1>



      <div
        className={styles.cards}
      >



        {/* GERENCIAR ALUNOS */}

        <Link
          to="/students"
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





        {/* MAPA DE SALA */}

        <Link
          to="/teacher/maps"
          className={styles.card}
        >

          <FaMapMarkerAlt
            className={styles.icon}
          />


          <h2>
            Mapas de Sala
          </h2>


          <p>
            Visualizar a disposição
            dos alunos em sala.
          </p>


        </Link>





        {/* TURMAS */}

        <Link
          to="/teacher/classes"
          className={styles.card}
        >

          <FaChalkboardTeacher
            className={styles.icon}
          />


          <h2>
            Minhas Turmas
          </h2>


          <p>
            Gerenciar minhas turmas.
          </p>


        </Link>





        {/* GERENCIAR USUÁRIOS */}

        {
          canAccessCoordinator && (

            <Link
              to="/manager/users"
              className={styles.card}
            >

              <FaUserCog
                className={styles.icon}
              />


              <h2>
                Gerenciar Usuários
              </h2>


              <p>
                Aprovar cadastros,
                alterar permissões
                e controlar acessos.
              </p>


            </Link>

          )
        }



      </div>


    </section>

  );

}


export default Dashboard;
