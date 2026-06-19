import CadastroForm from "../../components/Login/CadastroForm";
import styles from "./Cadastro.module.css";

function Cadastro() {
  return (
    <section className={styles.register_container}>
      <CadastroForm />
    </section>
  );
}

export default Cadastro;
