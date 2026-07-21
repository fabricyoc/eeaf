import {
  useState
} from "react";


import styles from "./TeacherAssignments.module.css";


import {
  FaUserTie,
  FaPlus
} from "react-icons/fa";


import {
  toast
} from "react-toastify";


import Loading from "../../components/Loading";

import HeaderDashboard from "../../components/HeaderDashboard";

import DataTable from "../../components/ui/DataTable";

import ProfileModal from "../../components/ui/ProfileModal";


import {
  useTeacherAssignments
} from "../../hooks/useTeacherAssignments";


import {
  createTeacherAssignment,
  deleteTeacherAssignment,
  getTurmas,
  getDisciplinasDisponiveisPorTurma
} from "../../services/teacherAssignmentService";


import {
  useUsers
} from "../../hooks/useUsers";





function TeacherAssignments(){


const {

  assignments,

  loading,

  carregar

}=useTeacherAssignments();





const {

 users

}=useUsers();





const [
 modal,
 setModal
]=useState(false);




const [
 turmas,
 setTurmas
]=useState([]);




const [
 disciplinas,
 setDisciplinas
]=useState([]);





const [
 form,
 setForm
]=useState({

 professor_id:"",

 turma_id:"",

 disciplina_id:""

});







async function abrirModal(){

  setForm({

    professor_id:"",

    turma_id:"",

    disciplina_id:""

  });


  setDisciplinas([]);


  setModal(true);


  try{

    const data = await getTurmas();

    setTurmas(data);


  }catch(error){

    console.error(error);

    toast.error(
      "Erro ao carregar turmas"
    );

  }

}








function alterar(
name,
value
){


if(
name==="turma_id" &&
!value
){

return;

}



setForm(prev=>({

...prev,

[name]:value

}));



if(name==="turma_id"){

buscarDisciplinas(value);

}


}









async function buscarDisciplinas(
 turmaId
){


try{


const data =

await getDisciplinasDisponiveisPorTurma(
 turmaId
);



setDisciplinas(data);



setForm(prev=>({

 ...prev,

 disciplina_id:""

}));



}catch(error){


console.error(error);


toast.error(
"Erro ao carregar disciplinas"
);


}


}









async function salvar(){


try{



if(

 !form.professor_id ||

 !form.turma_id ||

 !form.disciplina_id

){


toast.warning(
"Preencha todos os campos"
);


return;


}






await createTeacherAssignment(
 form
);





toast.success(
"Professor alocado!"
);




carregar();




fecharModal();





}catch(error){


console.error(error);


toast.error(
"Erro ao alocar professor"
);


}



}









function fecharModal(){


setModal(false);



setForm({

 professor_id:"",

 turma_id:"",

 disciplina_id:""

});



setDisciplinas([]);


}









async function excluir(row){


try{


await deleteTeacherAssignment(
 row.id
);



toast.success(
"Alocação removida"
);



carregar();



}catch(error){


console.error(error);


toast.error(
"Erro ao remover"
);


}



}







if(loading){


return (

<Loading
text="Carregando alocações..."
/>

);


}









const columns=[



{

key:"professor",

label:"Professor",

render:(row)=>

row.users?.name || "-"

},




{

key:"turma",

label:"Turma",

render:(row)=>

row.turmas?.nome || "-"

},




{

key:"disciplina",

label:"Disciplina",

render:(row)=>

row.disciplinas?.nome || "-"

}


];









return(


<section className={styles.container}>


<HeaderDashboard

title="Alocação de Professores"

>


<button

className={styles.button}

onClick={abrirModal}

>

<FaPlus/>

Nova Alocação

</button>


</HeaderDashboard>








<DataTable

columns={columns}

data={assignments}


actions={
(row)=>(


<button

className={styles.delete}

onClick={()=>excluir(row)}

>

Excluir

</button>


)

}

/>










{
modal &&


<ProfileModal


title="Alocar Professor"

icon={<FaUserTie/>}


form={form}




fields={[





{
name:"professor_id",

label:"Professor",

type:"select",

options:[

{
 value:"",
 label:"Selecione um professor",
  disabled:true
},

...users

.filter(
u=>u.role==="teacher"
)

.map(
u=>({

value:u.id,

label:u.name

})

)

]

},








{
 name:"turma_id",

 label:"Turma",

 type:"select",

 options:[

 {
   value:"",
   label:"Selecione uma turma",
    disabled:true
 },

 ...turmas.map(
 t=>({

 value:t.id,

 label:t.nome

 })

 )

 ]

},








{
name:"disciplina_id",

label:"Disciplina",

type:"select",

options:[

{
 value:"",
 label:"Selecione uma disciplina",
  disabled:true
},

...disciplinas.map(
d=>({

value:d.id,

label:d.nome

})

)

]

}



]}





onChange={alterar}



onSave={salvar}



onClose={fecharModal}



/>



}




</section>


);


}



export default TeacherAssignments;