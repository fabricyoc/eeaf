import styles from "./UserCard.module.css";

import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaEdit
} from "react-icons/fa";

import { useRole } from "../../hooks/useRole";


function UserCard({
  usuario,
  onEdit
}) {


  const {
    canChangeRole
  } = useRole();




  const roleLabel = {

    common:
      "Comum",

    secretary:
      "Secretário(a)",

    teacher:
      "Professor(a)",

    coordinator:
      "Coordenador(a)",

    admin:
      "Administrador"

  };





  const roleClass = {

    common:
      styles.common,

    secretary:
      styles.secretary,

    teacher:
      styles.teacher,

    coordinator:
      styles.coordinator,

    admin:
      styles.admin

  };





  return (

    <article
      className={styles.card}
    >

      <div
        className={styles.top}
      >

        <div
          className={styles.avatar}
        >

          <FaUser />

        </div>


        <div
          className={styles.status}
        />

      </div>





      <div
        className={styles.content}
      >

        <h3
          className={styles.name}
        >

          {
            usuario.name
          }

        </h3>





        <p
          className={styles.email}
        >

          <FaEnvelope />

          {
            usuario.email ||
            "Sem email"
          }

        </p>





        <div
          className={`
            ${styles.role}
            ${roleClass[usuario.role] || ""}
          `}
        >

          <FaUserShield />


          <span>

            {
              roleLabel[usuario.role]
              ||
              "Sem permissão"
            }

          </span>


        </div>


      </div>





      {
        canChangeRole(usuario.role) && (

          <button

            className={styles.button}

            onClick={() =>
              onEdit(usuario)
            }

          >

            <FaEdit />

            Editar usuário

          </button>

        )
      }


    </article>

  );

}


export default UserCard;