import styles from "./PendingApproval.module.css";

import {
  FaClock,
  FaSignOutAlt,
  FaSyncAlt
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

import {
  toast
} from "react-toastify";

import {
  supabase
} from "../../utils/supabase";

import {
  useRole
} from "../../hooks/useRole";


function PendingApproval() {


  const navigate = useNavigate();


  const {
    role,
    loading,
  } = useRole();




  async function atualizarAcesso() {

    window.location.reload();

  }




  async function sair() {

    await supabase.auth.signOut();

    toast.info(
      "Sessão encerrada."
    );

    navigate("/login");

  }





  const roleLabels = {

    common:
      "COMUM",

    secretary:
      "SECRETÁRIO(A)",

    teacher:
      "PROFESSOR(A)",

    coordinator:
      "COORDENADOR(A)",

    admin:
      "ADMINISTRADOR"

  };





  return (

    <section
      className={styles.container}
    >

      <div
        className={styles.card}
      >


        <div
          className={styles.icon}
        >

          <FaClock />

        </div>




        <h1
          className={styles.title}
        >

          Solicitação recebida

        </h1>




        <p
          className={styles.text}
        >

          Sua conta foi criada com sucesso,
          porém ainda não possui permissões
          para acessar o sistema.

        </p>




        <p
          className={styles.text}
        >

          Um administrador ou coordenador
          precisa liberar seu acesso.

        </p>





        <div
          className={styles.status}
        >

          <span>
            Perfil atual:
          </span>



          <strong>

            {
              loading

                ?

              "Carregando..."

                :

              roleLabels[role]
              ||
              "SEM PERFIL"

            }

          </strong>


        </div>





        <div
          className={styles.actions}
        >

          <button
            className={styles.refresh}
            onClick={atualizarAcesso}
          >

            <FaSyncAlt />

            Atualizar acesso

          </button>





          <button
            className={styles.logout}
            onClick={sair}
          >

            <FaSignOutAlt />

            Sair

          </button>


        </div>


      </div>


    </section>

  );

}


export default PendingApproval;