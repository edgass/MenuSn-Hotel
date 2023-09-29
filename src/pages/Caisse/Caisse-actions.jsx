import React, { useState,useRef,useEffect } from 'react';

import './Caisse.css';
import { removeAllElementInCommand } from '../../store/change-command-state-store';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

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
        

function CaisseActions() {


  

  const toast = useRef(null);

  const displayMessage = (severity,summary,details,life) => {
     toast.current.show({ severity: severity, summary: summary, detail: details, life: life });

}
  const dispatch = useDispatch();
  const changeCommandeState = useAppSelector(state=>state.changeCommandStateSlice);
  const deleteState = useAppSelector(state=>state.deleteFoodSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [updateFoodVisible, setUpdateFoodVisible] = useState(false);
  const [deleteFoodVisible, setDeleteFoodVisible] = useState(false);
  const [foodToUpdate, setFoodToUpdate] = useState(new FoodModel('','','','','',0));

  useEffect(()=>{

  },[
    dispatch
])


  return (


      <div className="">
        <div class="grid md:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          <div onClick={()=>dispatch(removeAllElementInCommand())} class="bg-blue-400 rounded-md m-3"><p  class="px-7 py-8 text-center text-white">Nouvelle Commande</p></div>
          <div class="bg-green-500 rounded-md m-3"><p class="px-7 py-8 text-center text-white">Entrée</p></div>
          <div class="bg-orange-400 rounded-md m-3"><p class="px-7 py-8 text-center text-white">Sortie</p></div>
          <div class="bg-pink-400 rounded-md m-3"><p class="px-7 py-8 text-center text-white">Relicat</p></div>
        </div>
      </div>
 
  );
}

export default CaisseActions;