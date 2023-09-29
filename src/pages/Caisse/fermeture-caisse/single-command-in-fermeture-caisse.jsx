
import { useEffect, useState } from "react";
import { setOuvertureSessionModalOpen } from "../../../store/ouverture-session-caisse-store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hook";

function SingleCommandeInFermetureCaisse(props) {
  const [cmdPrice,setCmdPrice] = useState(null)
  const ouvrirSessionCaisseState = useAppSelector(state=>state.ouvrirSessionCaisseSlice);
  const closeSessionCaisseState = useAppSelector(state=>state.closeSessionCaisseSlice);
  const recuperationSessionActiveState = useAppSelector(state=>state.recuperationSessionActiveSlice);
  const dispatch = useDispatch();
          
  

  



  useEffect(()=>{
    var cmdPrice = 0;
    for(let i = 0;i<props.cmd.elements.length;i++){
      cmdPrice = cmdPrice + parseInt(props.cmd.elements[i].element.prix)
    }
    setCmdPrice(cmdPrice);
  },[
    dispatch
])


  return (


    <div className="bg-slate-100 p-3 m-3">
      <p>Emplacement : {props.cmd.emplacement} </p>
     <div className="flex justify-between">
      <p>Montan : {cmdPrice} FCFA</p>
      <p>Date : 01/02/2023 10:30:20</p>
     </div>
    </div>
 
  );

}


export default SingleCommandeInFermetureCaisse;