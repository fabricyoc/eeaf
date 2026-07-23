import styles from "./Dashboard.module.css";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaChalkboardTeacher,
  FaUserCog,
  FaNotesMedical,
  FaSchool,
  FaBookOpen,
  FaUserTie
} from "react-icons/fa";
import { useRole } from "../../hooks/useRole";
import CardDashboard from "../../components/CardDashboard";
function Dashboard() {

  const {
    role,
    canAccessStudents,
    canAccessCoordinator,
    canViewCertificates,
    isTeacher,
    isCoordinator,
    isAdmin
  } = useRole();

  const roleLabel = {
    common: "Comum",
    secretary: "Secretário(a)",
    teacher: "Professor(a)",
    coordinator: "Coordenador(a)",
    admin: "Administrador",
  };

  /*
    Área docente
    Professor, Coordenador e Admin
  */
  const canAccessTeacherArea =
    isTeacher ||
    isCoordinator ||
    isAdmin;

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
        {
          canAccessStudents && (
            <CardDashboard
              to="/students"
              icon={FaUsers}
              title="Gerenciar Alunos"
              subtitle="Buscar alunos, visualizar perfis e estatísticas."
            />
          )
        }

        {/* MAPA DE SALA */}
        {
          canAccessTeacherArea && (
            <CardDashboard
              to="/roommap"
              icon={FaMapMarkerAlt}
              title="Mapas de Sala"
              subtitle="Visualizar disposição dos alunos em sala."
            />
          )
        }

        {/* TURMAS */}
        {
          canAccessTeacherArea && (
            <CardDashboard
              to="/classes"
              icon={FaChalkboardTeacher}
              title="Minhas Turmas"
              subtitle="Gerenciar turmas e informações acadêmicas."
            />
          )
        }

        {/* COMPONENTES CURRICULARES */}
        {
          canAccessCoordinator && (
            <CardDashboard
              to="/disciplines"
              icon={FaBookOpen}
              title="Disciplinas"
              subtitle="Cadastrar disciplinas e vinculá-las às turmas."
            />
          )
        }

        {/* ALOCAÇÃO DOCENTE */}
        {
          canAccessCoordinator && (
            <CardDashboard
              to="/teacher/assignment"
              icon={FaUserTie}
              title="Alocação Docente"
              subtitle="Alocar professores às disciplinas e às turmas."
            />
          )
        }

        {/* ATESTADOS */}
        {
          canViewCertificates && (
            <CardDashboard
              to="/medical/certificates"
              icon={FaNotesMedical}
              title="Atestados Médicos"
              subtitle="Consultar e gerenciar atestados dos alunos."
            />
          )
        }

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
