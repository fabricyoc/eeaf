import UserCard from "../UserCard";

import styles from "./UserGrid.module.css";


function UserGrid({
  users = [],
  onEdit,
}) {


  if (!users.length) {

    return (

      <div
        className={styles.empty}
      >
        Nenhum usuário encontrado.

      </div>

    );

  }



  return (

    <div
      className={styles.grid}
    >

      {
        users.map((usuario) => (

          <UserCard

            key={usuario.id}

            usuario={usuario}

            onEdit={onEdit}

          />

        ))
      }


    </div>

  );

}


export default UserGrid;
