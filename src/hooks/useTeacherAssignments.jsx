import {
useCallback,
useEffect,
useState
} from "react";


import {
getTeacherAssignments
} from "../services/teacherAssignmentService";



export function useTeacherAssignments(){


const [
assignments,
setAssignments
]=useState([]);



const [
loading,
setLoading
]=useState(true);





const carregar = useCallback(
async()=>{


try{


setLoading(true);



const data =
await getTeacherAssignments();



setAssignments(data);



}catch(error){


console.error(error);



}
finally{


setLoading(false);


}


},[]);






useEffect(()=>{


carregar();


},[
carregar
]);





return {


assignments,


loading,


carregar


};


}