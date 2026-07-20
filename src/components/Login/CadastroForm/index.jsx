import styles from "./CadastroForm.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { signUp } from "../../../services/authService";

import InputText from "../../ui/InputText";
import InputPassword from "../../ui/InputPassword";

function CadastroForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function limparFormulario() {
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");

  }

  function validarFormulario() {
    if (
      !nome.trim() ||
      !email.trim() ||
      !senha ||
      !confirmarSenha
    ) {
      toast.error(
        "Preencha todos os campos."
      );
      return false;
    }

    if (senha !== confirmarSenha) {
      toast.error(
        "As senhas não coincidem."
      );
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      setLoading(true);

      await signUp({
        nome,
        email,
        senha,
      });
      toast.success(
        "Conta criada com sucesso!"
      );

      limparFormulario();

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
        "Erro ao criar conta."
      );
    } finally {
      setLoading(false);
    }
  }

  return (

    <div
      className={styles.register_card}
    >
      <h1>
        Criar Conta
      </h1>

      <p
        className={styles.subtitle}
      >
        Preencha os dados para se cadastrar
      </p>

      <form
        onSubmit={handleSubmit}
      >
        <InputText
          id="nome"
          label="Nome"
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        <InputText
          id="email"
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <InputPassword
          id="senha"
          label="Senha"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
        />

        <InputPassword
          id="confirmarSenha"
          label="Confirmar senha"
          placeholder="Confirme sua senha"
          value={confirmarSenha}
          onChange={(e) =>
            setConfirmarSenha(
              e.target.value
            )
          }
        />

        <button
          type="submit"
          disabled={loading}
          className={styles.btn_register}
        >
          {
            loading
              ? "Criando..."
              : "Criar Conta"
          }
        </button>
      </form>

      <div
        className={styles.divider}
      >
        <span>
          ou
        </span>
      </div>

      <Link
        to="/login"
        className={
          styles.btn_login
        }
      >
        Já tenho uma conta
      </Link>
    </div>
  );
}

export default CadastroForm;
