import { useNavigate } from "react-router-dom";
import styles from "./ButtonBackDashboard.module.css";
import { FaArrowLeft } from "react-icons/fa";

function ButtonBackDashboard() {
  
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.backButton}
      onClick={() => navigate(-1)}
      title="Voltar"
    >
      <FaArrowLeft />
    </button>
  );
}

export default ButtonBackDashboard;
