import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


import {
  useUsers
} from "../../hooks/useUsers";


import Loading from "../../components/Loading";
import UserGrid from "../../components/UserGrid";
import UserRoleModal from "../../components/UserRoleModal";


import styles from "./ManagerUsers.module.css";



function ManagerUsers() {


  const navigate = useNavigate();


  const [
    usuarioSelecionado,
    setUsuarioSelecionado
  ] = useState(null);



  const {
    users,
    loading,
    carregarUsers
  } = useUsers();




  if (loading) {

    return <Loading />;

  }




  return (

    <section
      className={styles.container}
    >


      {/* CABEÇALHO */}

      <div
        className={styles.header}
      >


        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
          title="Voltar"
        >

          <FaArrowLeft />

        </button>




        <h1
          className={styles.title}
        >

          Gerenciamento de Usuários

        </h1>



      </div>





      {/* CONTEÚDO */}

      <div
        className={styles.content}
      >


        <UserGrid

          users={users}

          onEdit={
            (usuario) =>
              setUsuarioSelecionado(usuario)
          }

        />


      </div>







      {
        usuarioSelecionado && (

          <UserRoleModal


            usuario={
              usuarioSelecionado
            }



            onClose={
              () =>
                setUsuarioSelecionado(null)
            }



            onSuccess={

              () => {

                carregarUsers();

                setUsuarioSelecionado(null);

              }

            }


          />

        )
      }



    </section>

  );

}



export default ManagerUsers;