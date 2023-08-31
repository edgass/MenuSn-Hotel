import React, { useState,useRef,useEffect } from 'react';
import { setSelectedElement, setCommand } from '../../store/change-command-state-store';

import './Caisse.css';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

import { Dialog } from 'primereact/dialog';
import Element from '../../partials/elements/Element'
import { classNames } from 'primereact/utils';
import { Image } from 'primereact/image';

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
import { fetchFoodsByCategory } from '../../store/fetch-food-by-category-store';
import SingleElementInCommande from '../../models/single-element-in-command';
        

function CaisseElements() {


  const dispatch = useDispatch();
  const fetchFoodByCategoryState = useAppSelector(state=>state.fetchFoodByCategorySlice);
  const changeCommandeState = useAppSelector(state=>state.changeCommandStateSlice);
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
        
        <h4 class="mb-2 ml-2">Elements</h4>
        <div class="grid md:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {fetchFoodByCategoryState.loading == 'pending' ? <div><p>En cours de chargement !!</p></div> :
          fetchFoodByCategoryState.entities?.length === 0 ? <div><p>Aucun élément de cette catégorie n'a été trouvé</p></div> :
                                            fetchFoodByCategoryState.entities.map((tab)=>{

                                                return(
                                                  <div key={tab[0].id} onClick={()=>{
                                                    dispatch(setCommand(new SingleElementInCommande(tab[0],1)));
                                                    dispatch(setSelectedElement(tab[0]))
                                                  }} class="bg-zinc-200 rounded-md m-3 ">
                                                  <img src={tab[0].imagepath} class="object-cover h-24 w-48"/>
                                                  <p> {tab[0].name} - {tab[0].prix}FCFA </p>
                                                </div>
                                                )
                                            })}
         
        </div>
      </div>
 
  );
}

export default CaisseElements;