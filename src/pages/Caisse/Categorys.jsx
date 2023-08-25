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
import SingleCategory from './single-category';
        

function CaisseCategorys() {


  

  const toast = useRef(null);

  const displayMessage = (severity,summary,details,life) => {
     toast.current.show({ severity: severity, summary: summary, detail: details, life: life });

}
  const dispatch = useDispatch();
  const categoryState = useAppSelector(state=>state.fetchCategorySlice);
  const deleteState = useAppSelector(state=>state.deleteFoodSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [updateFoodVisible, setUpdateFoodVisible] = useState(false);
  const [deleteFoodVisible, setDeleteFoodVisible] = useState(false);
  const [foodToUpdate, setFoodToUpdate] = useState(new FoodModel('','','','','',0));

  useEffect(()=>{
    dispatch(fetchCategory());
  },[
    dispatch
])

  return (


      <div className="">
        <h4 class="mb-2 ml-2">Categories</h4>
        <div class="grid md:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {categoryState.loading == 'pending' ? <div><p>En cours de chargement !!</p></div> :
          categoryState.entities?.length === 0 ? <div><p>Aucune Categorie retrouvée. Veillez reactualiser la page SVP</p></div> :
                                            categoryState.entities.map((tab)=>{
                                          
                                                return(
                                                 <SingleCategory key={tab.position} category={tab}/>
                                                )
                                            })}
        </div>
      </div>
 
  );
}

export default CaisseCategorys;