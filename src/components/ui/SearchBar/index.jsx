import {
  useEffect,
  useState,
  useMemo
} from "react";

import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

function SearchBar({
  items = [],
  onSearch,
  setBuscaAtiva,
  fields = [],
  placeholder = "Pesquisar..."
}) {

  const [pesquisa, setPesquisa] = useState("");

  function getNestedValue(obj, path) {

    const keys = path.split(".");


    function resolver(valor, index) {


      if (valor == null) {

        return [];

      }



      if (index === keys.length) {

        return Array.isArray(valor)

          ? valor

          : [valor];

      }



      const chave = keys[index];



      if (Array.isArray(valor)) {


        return valor.flatMap(item =>

          resolver(item, index)

        );


      }



      return resolver(
        valor[chave],
        index + 1
      );


    }



    return resolver(obj, 0);

  }

  function formatarData(valor) {

    if (!valor) return "";

    if (
      typeof valor === "string" &&
      /^\d{4}-\d{2}-\d{2}/.test(valor)
    ) {
      const [ano, mes, dia] = valor.substring(0, 10).split("-");
      return `${dia}/${mes}/${ano}`;
    }

    return valor.toString();
  }

  function normalizarTexto(texto) {
    return (
      texto
        ?.toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
      || ""
    );
  }

  const resultadoBusca = useMemo(() => {

    const termo = normalizarTexto(pesquisa.trim());

    if (!termo) return items;

    const termos = termo.split(/\s+/).filter(Boolean);

    return items.filter((item) => {

      const textoBusca = fields
        .map((field) => {

          const valor = getNestedValue(item, field);


          return normalizarTexto(

            Array.isArray(valor)

              ? valor
                .map(v => formatarData(v))
                .join(" ")

              : formatarData(valor)

          );

        })
        .join(" ");

      return termos.every((palavra) =>
        textoBusca.includes(palavra)
      );

    });

  }, [pesquisa, items, fields]);

  useEffect(() => {

    onSearch?.(resultadoBusca);

    setBuscaAtiva?.(
      pesquisa.trim().length > 0
    );

  }, [resultadoBusca]);

  return (

    <div className={styles.container}>

      <FaSearch className={styles.icon} />

      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

    </div>

  );

}

export default SearchBar;
