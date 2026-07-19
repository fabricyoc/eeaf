import styles from "./CardDashboard.module.css";
import { Link } from "react-router-dom";

function CardDashboard({
  to,
  icon: Icon,
  title,
  subtitle
}) {
  return (
    <Link
      to={to}
      className={styles.card}
    >
      <Icon
        className={styles.icon}
      />
      <h2>
        {title}
      </h2>
      <p>
        {subtitle}
      </p>
    </Link >
  );
}

export default CardDashboard;
