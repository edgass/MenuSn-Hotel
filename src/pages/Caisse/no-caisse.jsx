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
import OuvertureCaisse from './Ouverture-Caisse-Modal';
import { Button } from 'primereact/button';
import { ouvrirSessionCaisse } from '../../store/ouverture-session-caisse-store';
        

function NoCaisse() {


  

  const toast = useRef(null);

  const displayMessage = (severity,summary,details,life) => {
     toast.current.show({ severity: severity, summary: summary, detail: details, life: life });

}
  const dispatch = useDispatch();
  const fetchState = useAppSelector(state=>state.fetchFoodSlice);
  const changeStateState = useAppSelector(state=>state.fetchCommandSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [updateFoodVisible, setUpdateFoodVisible] = useState(false);
  const [changeStateVisible, setChangeStateVisible] = useState(false);
  const [foodToUpdate, setFoodToUpdate] = useState(new FoodModel('','','','','',0));
  const ouvrirSessionCaisseState = useAppSelector(state=>state.ouvrirSessionCaisseSlice);
  
  const state = useAppSelector(state=>state.authSlice);

  useEffect(()=>{
    dispatch(fetchFoods());
    dispatch(fetchCategory());
  },[
    dispatch
])

  return (
    
    
    <div className='text-center'>
      <h1 className='mb-1'>Aucune caisse n'est ouverte</h1>
      <p className='mb-1'>Pour pouvoir effectuer des opérations, ouvrez une caisse en cliqaunt sur le bouton ci dissous.</p>
      {
        ouvrirSessionCaisseState.loading == "true" ?   <Button loading="true" severity="danger" label="Ouvrir la caisse"/> :   <Button onClick={()=>dispatch(ouvrirSessionCaisse(state.user.uid))} severity="danger" label="Ouvrir la caisse"/>
      }
    
    </div>
  );
}

export default NoCaisse;