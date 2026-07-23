import {
 useState
} from "react";


export function useCertificateView(){

 const [
  open,
  setOpen
 ] = useState(false);


 const [
  atestado,
  setAtestado
 ] = useState(null);


 function visualizar(item){
  setAtestado(item);
  setOpen(true);
 }


 function fechar(){
  setOpen(false);
  setAtestado(null);
 }


 return {
  open,
  atestado,
  visualizar,
  fechar
 };

}