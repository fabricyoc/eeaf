import { supabase } from "../utils/supabase";



export async function getTurmasDaDisciplina(
 disciplinaId
){

const {
 data,
 error
}=await supabase

.from("turma_disciplina")

.select(`

turma_id,

turmas(
 id,
 nome
)

`)

.eq(
"disciplina_id",
disciplinaId
);



if(error){

throw error;

}


return (

data || []

)

.map(
item=>item.turmas
)

.filter(Boolean);


}






export async function salvarTurmasDisciplina(
disciplinaId,
turmas
){


await supabase

.from("turma_disciplina")

.delete()

.eq(
"disciplina_id",
disciplinaId
);



if(!turmas.length){

return;

}



const registros =
turmas.map(
turmaId=>({

disciplina_id:disciplinaId,

turma_id:turmaId

})
);



const {
error
}=await supabase

.from("turma_disciplina")

.insert(
registros
);



if(error){

throw error;

}


}