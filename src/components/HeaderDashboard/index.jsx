import ButtonBackDashboard from "../ui/ButtonBackDashboard";
import styles from "./HeaderDashboard.module.css";

function HeaderDashboard({ title, children }) {
  return (
    <section className={styles.header_dashboard}>
      <div className={styles.header_title}>
        <ButtonBackDashboard />
        <h2 className={styles.title}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default HeaderDashboard;
