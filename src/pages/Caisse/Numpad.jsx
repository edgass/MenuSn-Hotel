import React, { useState,useRef,useEffect } from 'react';
import { setCurrentQuantity,changeCurrentElementQuantity } from '../../store/change-command-state-store';

import './Caisse.css';

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
        

function NumPad() {


  

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
  const [qttToSet, setQttToSet] = useState("");

  useEffect(()=>{
  
  },[
    dispatch
])

  var numPad = ['7','8','9','4','5','6','1','2','3','0']

  return (


      <div className="">
        <div class="grid grid-cols-3 gap-1">
         { numPad.map((element) => {
          return(
            <div onClick={()=>{
             dispatch(setCurrentQuantity(element));
            }} class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">{element}</p></div>
          )
          })}
        
          <div class="bg-blue-400 px-7 py-8"><p class="px-3 text-center text-white">Reinitialiser</p></div>
          <div onClick={()=>{dispatch(changeCurrentElementQuantity(parseInt(changeCommandeState.currentQtt)))}} class="bg-sky-700 px-7 py-8"><p class="px-3 text-center text-white">Valider</p></div>
        </div>
      </div>
 
  );
}

export default NumPad;