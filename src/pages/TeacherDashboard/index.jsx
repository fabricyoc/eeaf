import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

import SearchBar from "../../components/SearchBar";
import StatsCards from "../../components/StatsCards";
import StudentGrid from "../../components/StudentGrid";
import Loading from "../../components/Loading";

import styles from "./TeacherDashboard.module.css";

function TeacherDashboard() {

  const [professor, setProfessor] = useState("");

  const [todosAlunos, setTodosAlunos] = useState([]);

  const [alunos, setAlunos] = useState([]);

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {

    carregarProfessor();

    carregarTodosAlunos();

  }, []);

  async function carregarProfessor() {

    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("name")
        .eq("id", user.id)
        .single();

      const nomes = data.name.trim().split(" ");

      const primeiroNome = nomes[0];

      const ultimoNome =
        nomes.length > 1
          ? nomes[nomes.length - 1]
          : "";

      setProfessor(
        `${primeiroNome} ${ultimoNome}`.toUpperCase()
      );

    } catch (error) {

      console.error(error);

    }

  }

  async function carregarTodosAlunos() {

    try {

      setLoadingPage(true);

      const PLANILHA_ID =
        "1OZpgFfTynpQfKrrQt3GQVp86Yaat1VvKsJRsk3oYeHE";

      const ABAS = [
        "1ST",
        "2ST",
        "3ST",

        // "1SR",
        // "2SR",
        // "3SR",

        // "6AEF",
        // "7AEF",
        // "8AEF",
        // "9AEF"
      ];

      const promessas = ABAS.map(async (aba) => {

        const resposta = await fetch(
          `https://opensheet.elk.sh/${PLANILHA_ID}/${aba}`
        );

        const dados = await resposta.json();

        return dados.map(aluno => ({
          ...aluno,
          turma: aba
        }));

      });

      const resultado = await Promise.all(promessas);

      const todos = resultado.flat();

      setTodosAlunos(todos);

      setAlunos(todos);

    } catch (error) {

      console.error(error);

    } finally {

      setLoadingPage(false);

    }

  }

  if (loadingPage) {

    return <Loading />;

  }

  return (

    <section className={styles.container}>

      <div className={styles.header}>

        <h1 className={styles.title}>
          {professor}, este é seu espaço docente!
        </h1>

        <p className={styles.subtitle}>
          Gerencie seus alunos
        </p>

      </div>

      <SearchBar
        todosAlunos={todosAlunos}
        setAlunos={setAlunos}
      />

      <StatsCards
        alunos={alunos}
        totalAlunos={todosAlunos.length}
      />

      <StudentGrid alunos={alunos} />

    </section>

  );
}

export default TeacherDashboard;