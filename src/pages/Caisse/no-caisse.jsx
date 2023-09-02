import React, { useState,useRef,useEffect } from 'react';

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
import { recupererSessionActive } from '../../store/recuperation-session-active-store';
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
import OuvertureCaisse from './fermeture-caisse/fermeture-Caisse-Modal';
import { Button } from 'primereact/button';
import { ouvrirSessionCaisse } from '../../store/ouverture-session-caisse-store';
import { auth } from '../../firebase.config';
        

function NoCaisse() {


  const dispatch = useDispatch();
  const fetchState = useAppSelector(state=>state.fetchFoodSlice);
  const changeStateState = useAppSelector(state=>state.fetchCommandSlice);
  const [fondCaisse, setFondCaisse] = useState(null);
  const ouvrirSessionCaisseState = useAppSelector(state=>state.ouvrirSessionCaisseSlice);
  const authState = useAppSelector(state=>state.authSlice);
  
  const state = useAppSelector(state=>state.authSlice);

  useEffect(()=>{
  },[
    dispatch
])

  return (
    
    
    <div className='text-center'>
      <h1 className='mb-1'>Aucune caisse n'est ouverte</h1>
      <p className='mb-1'>Pour pouvoir effectuer des opérations, renseignez votre fond de caisse puis cliquez sur  ouvrir la caisse</p>
      <div className='flex justify-center'>
      <input onChange={(val)=>setFondCaisse(val.target.value)} type="text" id="error" class="mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fond de caisse" required></input>
      {
        ouvrirSessionCaisseState.loading === "pending" ?   <Button loading="true" severity="danger" label="Ouvrir la caisse"/> :   <Button disabled={fondCaisse == "" | fondCaisse == null | isNaN(fondCaisse)} onClick={()=>{dispatch(ouvrirSessionCaisse({hotelId:authState.hotel?.id,userId:auth.currentUser?.uid,fondCaisse:fondCaisse})), dispatch(recupererSessionActive())}} severity="danger" label="Ouvrir la caisse"/>
      }
      </div>
      
    
    </div>
  );
}

export default NoCaisse;