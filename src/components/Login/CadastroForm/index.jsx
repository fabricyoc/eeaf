import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabase";
import styles from "./CadastroForm.module.css";
import { toast } from "react-toastify";

function CadastroForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);

      // Cria o usuário no Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
      });

      if (error) throw error;

      // Salva informações adicionais na tabela users
      const { error: insertError } = await supabase
        .from("users")
        .insert([
          {
            id: data.user.id,
            name: nome,
            role: "common",
          },
        ]);

      if (insertError) throw insertError;

      await supabase.auth.signOut();

      toast.success("Conta criada com sucesso!");

      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.register_card}>
      <h1>Criar Conta</h1>

      <p className={styles.subtitle}>
        Preencha os dados para se cadastrar
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          <label htmlFor="nome">Nome</label>

          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.input_group}>
          <label htmlFor="email">E-mail</label>

          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.input_group}>
          <label htmlFor="senha">Senha</label>

          <div className={styles.password_container}>
            <input
              type={showPassword ? "text" : "password"}
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button
              type="button"
              className={styles.eye_button}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className={styles.input_group}>
          <label htmlFor="confirmarSenha">
            Confirmar senha
          </label>

          <div className={styles.password_container}>
            <input
              type={
                showConfirmPassword ? "text" : "password"
              }
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) =>
                setConfirmarSenha(e.target.value)
              }
            />

            <button
              type="button"
              className={styles.eye_button}
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
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
          className={styles.btn_register}
        >
          {loading ? "Criando..." : "Criar Conta"}
        </button>
      </form>

      <div className={styles.divider}>
        <span>ou</span>
      </div>

      <Link
        to="/login"
        className={styles.btn_login}
      >
        Já tenho uma conta
      </Link>
    </div>
  );
}

export default CadastroForm;
