import SearchBar from "../../ui/SearchBar";


const SEARCH_FIELDS = [

  "users.name",

  "turmas.nome",

  "disciplinas.nome"

];



function SearchTeacherAssignments({

  assignments,

  onSearch,

  setBuscaAtiva

}) {


  return (

    <SearchBar

      items={assignments}

      onSearch={onSearch}

      setBuscaAtiva={setBuscaAtiva}

      fields={SEARCH_FIELDS}

      placeholder="Pesquisar professor, turma ou disciplina..."

    />

  );

}


export default SearchTeacherAssignments;