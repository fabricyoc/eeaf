import LoginForm from '../../components/Login/LoginForm';
import styles from './Login.module.css';

function Login() {
  return (
    <section className={styles.login_container}>
      <LoginForm />
    </section>
  );
}

export default Login;
