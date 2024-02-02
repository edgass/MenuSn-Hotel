import React, { useState,useRef,useEffect } from 'react';
import { setSessionActive } from '../../store/recuperation-session-active-store';
import { recupererSessionActive } from '../../store/recuperation-session-active-store';


import { Message } from 'primereact/message';
        

import './Caisse.css';

import Sidebar from '../../partials/Sidebar';

import { Dialog } from 'primereact/dialog';
import Element from '../../partials/elements/Element'
import { classNames } from 'primereact/utils';

import { DataTable } from 'primereact/datatable';
import AddFood from '../add-food';
import { Toast } from 'primereact/toast';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hook';
import { fetchFoods } from '../../store/fetch-food-store';
import { ProgressSpinner } from 'primereact/progressspinner';
import UpdateFood from '../update-food';
import { FoodModel } from '../../models/food-model';
import { ConfirmDeleteFoodModal } from '../confirm_delete_food_modal';
import UpdateFood2 from '../update-food';
import { fetchCategory } from '../../store/fetch-category-store';
import CaisseActions from './Caisse-actions';
import NumPad from './Numpad';
import NewCommand from './New-command';
import ListeCommand from './Liste-command';
import CaisseCategorys from './Categorys';
import CaisseElements from './CaissesElements';
import { ChangeState } from './change-state';
import Alert from '../../partials/header/alert';
import CaisseHeader from '../../partials/Caisse-Header';
import NoCaisse from './no-caisse';
import db, { auth } from '../../firebase.config';
import { SessionCaisseModel } from '../../models/session-caisse-model';
import OuvertureCaisse from './fermeture-caisse/fermeture-Caisse-Modal';
        

function Caisse() {

  const dispatch = useDispatch();
  const fetchState = useAppSelector(state=>state.fetchFoodSlice);
  const changeStateState = useAppSelector(state=>state.fetchCommandSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [updateFoodVisible, setUpdateFoodVisible] = useState(false);
  const [changeStateVisible, setChangeStateVisible] = useState(false);
  const [foodToUpdate, setFoodToUpdate] = useState(new FoodModel('','','','','',0));
  const ouvrirSessionCaisseState = useAppSelector(state=>state.ouvrirSessionCaisseSlice);
  const recuperationSessionActiveState = useAppSelector(state=>state.recuperationSessionActiveSlice);

  useEffect(()=> {
/*

    const resp = db.collection("session")
    var data=  resp.where('active' ,'==', true).onSnapshot((snap)=>{
      var activeSession = snap.docs[0].data();
      if(activeSession !== null & activeSession !== undefined){
      dispatch(setSessionActive(new SessionCaisseModel(snap.docs[0].id, activeSession.active,activeSession.fermetureTimestamp,activeSession.ouvertureTimestamp,activeSession.fondDeCaisse,activeSession.userId)))
    }else{
      return undefined;
    }
    })
*/

   dispatch(recupererSessionActive())
    
    dispatch(fetchFoods());
    dispatch(fetchCategory());
    const user = auth.currentUser;
    console.log("La session active dans le state est : "+user)
    

  }

,[
   
]
)
  return (
    
    
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden '>

        {
          
          changeStateState.changeStateVisible[0] ?  <ChangeState/> : null
        }
         
         {
          ouvrirSessionCaisseState.ouvertureSessionModalOpen ? <OuvertureCaisse/> : null
         }
        

      {/*  Site header */}
      <CaisseHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
     
     {
      recuperationSessionActiveState.loading == "pending" ?
     <div className='h-screen p-align-center'><ProgressSpinner /></div> :
     recuperationSessionActiveState.entities !== null & recuperationSessionActiveState.entities !== undefined & recuperationSessionActiveState.entities?.userId == auth.currentUser?.uid ? 
    
      <div className="h-screen">
        <div class="p-3 grid gap-4 grid-cols-3 myGrid">
          <div class="relative overflow-x-auto">
            <NewCommand/>
          </div>
          <div class="bg-slate-50 relative overflow-x-auto">
            <NumPad/>
          </div>
          <div class="bg-slate-100 relative overflow-x-auto">
            <CaisseActions/>
          </div>
        </div>
        <div class="grid grid-flow-row-dense grid-cols-12 myGrid">
          <div class="col-span-3 bg-slate-50">
            <CaisseCategorys/>
          </div>
          <div class="col-span-5 relative overflow-x-auto overflow-y-auto">
            <CaisseElements/>
          </div>
          <div class="col-span-4 bg-slate-50 relative overflow-x-auto overflow-y-auto">
            <ListeCommand/>
          </div>
        </div>
      </div> :
       <div className='grid place-items-center h-screen'>
       <NoCaisse/>
     </div> 
       }
    </div>
  );
}

export default Caisse;