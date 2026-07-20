import {
  useEffect,
  useState,
  useMemo
} from "react";

import {
  FaSearch
} from "react-icons/fa";

import styles from "./SearchBar.module.css";


function SearchBar({

  items = [],

  onSearch,

  setBuscaAtiva,

  fields = [],

  placeholder = "Pesquisar..."

}) {


  const [
    pesquisa,
    setPesquisa
  ] = useState("");



  function normalizarTexto(texto) {

    return (

      texto
        ?.toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(
          /[\u0300-\u036f]/g,
          ""
        )

      || ""

    );

  }



  const resultadoBusca =
    useMemo(() => {


      const termo =
        normalizarTexto(
          pesquisa.trim()
        );



      // Sem pesquisa
      if (!termo) {

        return items;

      }



      const termos =
        termo
          .split(/\s+/)
          .filter(Boolean);



      return items.filter(
        (item) => {


          const textoBusca =
            fields
              .map((field) =>
                normalizarTexto(
                  item[field]
                )
              )
              .join(" ");



          return termos.every(
            (palavra) =>
              textoBusca.includes(
                palavra
              )
          );


        }
      );


    }, [
      pesquisa,
      items,
      fields
    ]);




  useEffect(() => {


    if (!onSearch) {
      return;
    }


    onSearch(
      resultadoBusca
    );


    setBuscaAtiva?.(
      pesquisa.trim().length > 0
    );


  }, [
    resultadoBusca
  ]);





  return (

    <div
      className={
        styles.container
      }
    >

      <FaSearch
        className={
          styles.icon
        }
      />


      <input

        className={
          styles.input
        }

        type="text"

        placeholder={
          placeholder
        }

        value={
          pesquisa
        }

        onChange={(e) =>
          setPesquisa(
            e.target.value
          )
        }

      />


    </div>

  );

}


export default SearchBar;