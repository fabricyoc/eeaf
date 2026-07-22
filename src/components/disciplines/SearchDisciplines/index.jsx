import SearchBar from "../../ui/SearchBar";


const SEARCH_FIELDS = [

  "nome",

  "codigo",

  "turma_disciplina.turmas.nome"

];



function SearchDisciplines({

  disciplines,

  onSearch,

  setBuscaAtiva

}) {


  return (

    <SearchBar

      items={disciplines}

      onSearch={onSearch}

      setBuscaAtiva={setBuscaAtiva}

      fields={SEARCH_FIELDS}

      placeholder="Pesquise disciplina, código ou turma..."

    />

  );

}


export default SearchDisciplines;