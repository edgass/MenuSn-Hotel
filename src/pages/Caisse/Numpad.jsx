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
        

function NumPad() {


  

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
        <div class="grid grid-cols-3 gap-1">
          <div class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">7</p></div>
          <div class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">8</p></div>
          <div class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">9</p></div>
          <div class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">4</p></div>
          <div class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">5</p></div>
          <div class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">6</p></div>
          <div class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">1</p></div>
          <div class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">2</p></div>
          <div class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">3</p></div>
          <div class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">0</p></div>
          <div class="bg-slate-400 px-7 py-8"><p class="px-3 text-center text-white">.</p></div>
          <div class="bg-sky-700 px-7 py-8"><p class="px-3 text-center text-white">C</p></div>
        </div>
      </div>
 
  );
}

export default NumPad;