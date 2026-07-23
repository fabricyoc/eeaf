import {
  useEffect,
  useState
} from "react";

export function useCertificateFilter(atestados) {

  const [
    lista,
    setLista
  ] = useState([]);

  const [
    buscaAtiva,
    setBuscaAtiva
  ] = useState(false);


  useEffect(() => {
    setLista(atestados);
  }, [atestados]);


  function filtrar(resultado) {
    setLista(resultado);
    setBuscaAtiva(true);
  }


  function limparBusca() {
    setLista(atestados);
    setBuscaAtiva(false);
  }


  return {
    lista,
    buscaAtiva,
    filtrar,
    limparBusca
  };
}
