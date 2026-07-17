import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../../utils/supabase";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !senha) {
      toast.warning("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      // Login no Supabase Auth
      const { data: authData, error } =
        await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });

      if (error) throw error;

      // Busca informações do usuário na tabela users
      const {
        data: userData,
        error: userError,
      } = await supabase
        .from("users")
        .select("name, role")
        .eq("id", authData.user.id)
        .single();

      if (userError) throw userError;

      toast.success(
        `Bem-vindo, ${userData.name}!`
      );

      setEmail("");
      setSenha("");

      // Redirecionamento centralizado por role
      navigate("/redirect");

    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "E-mail ou senha inválidos."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.login_card}>
      <h1>Entrar</h1>

      <p className={styles.subtitle}>
        Acesse sua conta
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          <label htmlFor="email">
            E-mail
          </label>

          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className={styles.input_group}>
          <label htmlFor="senha">
            Senha
          </label>

          <div className={styles.password_container}>
            <input
              type={
                showPassword ? "text" : "password"
              }
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
            />

            <button
              type="button"
              className={styles.eye_button}
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.btn_login}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <a
        href="#"
        className={styles.forgot_password}
      >
        Esqueci a senha
      </a>

      <div className={styles.divider}>
        <span>ou</span>
      </div>

      <Link
        to="/cadastro"
        className={styles.btn_register}
      >
        Criar conta
      </Link>
    </div>
  );
}

export default LoginForm;
