import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaEdit
} from "react-icons/fa";


import {
  useRole
} from "../../hooks/useRole";


import styles from "./UserCard.module.css";



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

    teacher:
      "Professor",

    coordinator:
      "Coordenador",

    admin:
      "Administrador"

  };



  const roleClass = {

    common:
      styles.common,

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
        className={styles.header}
      >


        <div
          className={styles.avatar}
        >

          <FaUser />

        </div>



        <div
          className={styles.info}
        >

          <h3
            className={styles.name}
          >

            {usuario.name}

          </h3>



          <p
            className={styles.email}
          >

            <FaEnvelope />

            {usuario.email ||
              "Sem email"}

          </p>


        </div>


      </div>





      <div

        className={`
          ${styles.role}
          ${roleClass[usuario.role]}
        `}

        title={
          usuario.role === "common"
            ? "Usuário pendente de atribuição de permissão"
            : undefined
        }

      >


        <FaUserShield />


        <span>

          {roleLabel[usuario.role]}

        </span>


      </div>





      {
        canChangeRole(usuario.role)

        &&

        (

          <button

            className={styles.button}

            onClick={() =>
              onEdit(usuario)
            }

          >

            <FaEdit />

            Alterar permissão


          </button>

        )

      }



    </article>

  );


}


export default UserCard;