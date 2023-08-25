import React, { useState,useRef,useEffect } from 'react';

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
        

function CaisseCategorys() {


  

  const toast = useRef(null);

  const displayMessage = (severity,summary,details,life) => {
     toast.current.show({ severity: severity, summary: summary, detail: details, life: life });

}
  const dispatch = useDispatch();
  const fetchState = useAppSelector(state=>state.fetchFoodSlice);
  const deleteState = useAppSelector(state=>state.deleteFoodSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [updateFoodVisible, setUpdateFoodVisible] = useState(false);
  const [deleteFoodVisible, setDeleteFoodVisible] = useState(false);
  const [foodToUpdate, setFoodToUpdate] = useState(new FoodModel('','','','','',0));

  useEffect(()=>{
    dispatch(fetchFoods());
    dispatch(fetchCategory());
  },[
    dispatch
])

  return (


      <div className="">
        <h4 class="mb-2 ml-2">Categories</h4>
        <div class="grid md:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          
          <div class="bg-zinc-200 rounded-md m-3 "><p class="px-7 py-8 text-center text-neutral-800">Plat</p></div>
          <div class="bg-zinc-200 rounded-md m-3"><p  class="px-7 py-8 text-center text-neutral-800">Entrée</p></div>
          <div class="bg-zinc-200 rounded-md m-3"><p class="px-7 py-8 text-center text-neutral-800">Boisson</p></div>
          <div class="bg-zinc-200 rounded-md m-3"><p class="px-7 py-8 text-center text-neutral-800">Diner</p></div>
        </div>
      </div>
 
  );
}

export default CaisseCategorys;