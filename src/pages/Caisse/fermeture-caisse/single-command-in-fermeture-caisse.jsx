
import { useEffect } from "react";
import { setOuvertureSessionModalOpen } from "../../../store/ouverture-session-caisse-store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hook";

function SingleCommandeInFermetureCaisse() {
  const ouvrirSessionCaisseState = useAppSelector(state=>state.ouvrirSessionCaisseSlice);
  const closeSessionCaisseState = useAppSelector(state=>state.closeSessionCaisseSlice);
  const recuperationSessionActiveState = useAppSelector(state=>state.recuperationSessionActiveSlice);
  const dispatch = useDispatch();
          
  

  



  useEffect(()=>{

  },[
    dispatch
])


  return (


    <div className="bg-slate-100 p-3 m-3">
      <p>Commande : xxxxxx</p>
     <div className="flex justify-between">
      <p>Montan : 5000F</p>
      <p>Date : 01/02/2023 10:30:20</p>
     </div>
    </div>
 
  );

}


export default SingleCommandeInFermetureCaisse;