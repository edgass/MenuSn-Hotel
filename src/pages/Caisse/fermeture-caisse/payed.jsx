
import { useEffect } from "react";
import { setOuvertureSessionModalOpen } from "../../../store/ouverture-session-caisse-store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hook";
import SingleCommandeInFermetureCaisse from "./single-command-in-fermeture-caisse";

function Payed() {
  const ouvrirSessionCaisseState = useAppSelector(state=>state.ouvrirSessionCaisseSlice);
  const closeSessionCaisseState = useAppSelector(state=>state.closeSessionCaisseSlice);
  const recuperationSessionActiveState = useAppSelector(state=>state.recuperationSessionActiveSlice);
  const dispatch = useDispatch();
          
  

  



  useEffect(()=>{

  },[
    dispatch
])


  return (


    <div className="w-full">
      <h1 className="text-green-500 text-bold m-3 text-xl">Payés</h1>
      <div className="">
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>
      <SingleCommandeInFermetureCaisse/>

      </div>
      <h1 className="m-3 p-3">Total : 525 000 FCFA</h1>
    </div>
 
  );

}


export default Payed;