import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaChalkboardTeacher,
  FaUserCog,
} from "react-icons/fa";
import { useRole } from "../../hooks/useRole";
import CardDashboard from "../../components/CardDashboard";

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
        Painel do {roleLabel[role] || "Usuário"}
      </h1>
      <div
        className={styles.cards}
      >
        {/* GERENCIAR ALUNOS */}
        <CardDashboard
          to="/students"
          icon={FaUsers}
          title="Gerenciar Alunos"
          subtitle="Buscar alunos, visualizar perfis e estatísticas."
        />

        {/* MAPA DE SALA */}
        <CardDashboard
          to="/roommap"
          icon={FaMapMarkerAlt}
          title="Mapas de Sala"
          subtitle="Visualizar a disposição dos alunos em sala."
        />

        {/* TURMAS */}
        {/* <CardDashboard
          to="/classes"
          icon={FaChalkboardTeacher}
          title="Minhas Turmas"
          subtitle="Gerenciar minhas turmas."
        /> */}



        {/* GERENCIAR USUÁRIOS */}
        {
          canAccessCoordinator && (
            <CardDashboard
              to="/manager/users"
              icon={FaUserCog}
              title="Gerenciar Usuários"
              subtitle="Aprovar cadastros, alterar permissões e controlar acessos."
            />
          )
        }
      </div>
    </section>
  );
}


export default Dashboard;
