import { Dialog } from "primereact/dialog";
import { recupererSessionActive } from "../../../store/recuperation-session-active-store";
import { useEffect } from "react";
import { setOuvertureSessionModalOpen } from "../../../store/ouverture-session-caisse-store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hook";
import { Button } from "primereact/button";
import { closeSessionCaisse } from "../../../store/close-session-caisse-store";
import Payed from "./payed";



function OuvertureCaisse() {
  const ouvrirSessionCaisseState = useAppSelector(state=>state.ouvrirSessionCaisseSlice);
  const closeSessionCaisseState = useAppSelector(state=>state.closeSessionCaisseSlice);
  const recuperationSessionActiveState = useAppSelector(state=>state.recuperationSessionActiveSlice);
  const dispatch = useDispatch();
          
  

  



  useEffect(()=>{

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
      <Payed/>
      <Payed/>
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