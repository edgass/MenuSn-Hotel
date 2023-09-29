import { Dialog } from "primereact/dialog";
import { recupererSessionActive } from "../../../store/recuperation-session-active-store";
import { useEffect, useState } from "react";
import { setOuvertureSessionModalOpen } from "../../../store/ouverture-session-caisse-store";
import { useDispatch } from "react-redux";
import { fetchCommand } from "../../../store/fetch-command-store";
import { useAppSelector } from "../../../hook";
import { Button } from "primereact/button";
import { closeSessionCaisse } from "../../../store/close-session-caisse-store";
import Payed from "./payed";
import Cuisine from "./cuisine";
import Attente from "./attente";



function OuvertureCaisse() {
  const [acceptCaisseConcordance,setAcceptCaisseConcordance] = useState(true)
  const ouvrirSessionCaisseState = useAppSelector(state=>state.ouvrirSessionCaisseSlice);
  const closeSessionCaisseState = useAppSelector(state=>state.closeSessionCaisseSlice);
  const recuperationSessionActiveState = useAppSelector(state=>state.recuperationSessionActiveSlice);
  const dispatch = useDispatch();
          
  

  



  useEffect(()=>{
    dispatch(fetchCommand())

  },[
    dispatch
])


  return (


    <Dialog header="Fermeture de Caisse" visible={ouvrirSessionCaisseState.ouvertureSessionModalOpen} onHide={() => dispatch(setOuvertureSessionModalOpen(false))}
    style={{ width: '90vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
     <div className="flex justify-evenly mb-6">
      <p>Référence Caisse : 654465dsv546v65</p>
      <p>Ouverture : 12/02/2023 02:32:10</p>
      <p>Fond de Caisse : 452 000FCFA</p>
      </div> 
    <div className="flex justify-around overflow-hidden">
      <Payed/>
      <Cuisine/>
      <Attente/>
    </div>

    
<div class="flex pb-3">
    <div class="flex items-center h-5 m-3 p-3">
        <input onClick={()=>setAcceptCaisseConcordance(!acceptCaisseConcordance)} id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" checked={acceptCaisseConcordance} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    </div>
    <div class="ml-2 text-sm">
        <label for="helper-checkbox" class="font-medium text-gray-900 dark:text-gray-300">Je confirme la concordance entre l'affichage et la caisse.</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">En cas de désaccord, veuillez immédiatement signaler cette anomalie à votre superviseur ou à un responsable de caisse pour une vérification indépendante et une résolution appropriée.</p>
    </div>
</div>

    {
      closeSessionCaisseState.loading === "pending" ?  <Button loading="true" label="Fermer"/> :  <Button onClick={()=>{
        dispatch(closeSessionCaisse(recuperationSessionActiveState.entities.id)), 
        dispatch(recupererSessionActive()),
        dispatch(setOuvertureSessionModalOpen(false))
      }
      } label="Fermer"/>
    }
   
</Dialog>
 
  );

}


export default OuvertureCaisse;