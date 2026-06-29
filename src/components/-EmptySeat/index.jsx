import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import styles from "./SeatCard.module.css";

/**
 * SeatCard representa cada posição do mapa (ocupada ou vazia)
 */
function SeatCard({ id, aluno, posicao }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id, // 👈 sempre a posição da carteira (ex: "11", "12", etc)
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.seat}
      {...attributes}
      {...listeners}
    >

      {/* FOTO DO ALUNO */}
      {aluno ? (
        <>
          <img
            className={styles.avatar}
            src={
              aluno.foto_url ||
              "https://placehold.co/180x180?text=Sem+Foto"
            }
            alt={aluno.nome}
            onError={(e) => {
              e.target.src =
                "https://placehold.co/180x180?text=Sem+Foto";
            }}
          />

          <div className={styles.info}>
            <strong>{aluno.nome}</strong>
            <small>{aluno.email}</small>
          </div>
        </>
      ) : (
        /* CADEIRA VAZIA */
        <div className={styles.empty}>
          <div className={styles.circle}>+</div>

          <span className={styles.text}>
            Livre
          </span>

          <small className={styles.pos}>
            {posicao}
          </small>
        </div>
      )}

    </div>
  );
}

export default SeatCard;