import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import styles from "./SeatCard.module.css";

function SeatCard({ id, aluno, posicao }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms ease",
  };

  const dragClass = isDragging ? styles.dragging : "";

  /**
   * empty card
   */
  if (!aluno) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`${styles.emptyCard} ${dragClass}`}
        {...attributes}
        {...listeners}
      >
        <div className={styles.circle}>+</div>

        <span className={styles.emptyText}>Livre</span>

        <small className={styles.position}>
          {posicao}
        </small>
      </div>
    );
  }

  /**
   * aluno
   */
  const fotoUrl = aluno.foto_id
    ? `https://drive.google.com/thumbnail?id=${aluno.foto_id}&sz=w1000`
    : "https://placehold.co/180x180?text=Sem+Foto";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.card} ${dragClass}`}
      {...attributes}
      {...listeners}
    >
      <img
        className={styles.photo}
        src={fotoUrl}
        alt={aluno.nome}
      />

      <h3 className={styles.name}>{aluno.nome}</h3>

      <p className={styles.email}>{aluno.email}</p>

      <p className={styles.position}>
        {posicao}
      </p>
    </div>
  );
}

export default SeatCard;