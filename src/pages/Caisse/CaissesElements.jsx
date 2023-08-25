import React, { useState,useRef,useEffect } from 'react';

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
        

function CaisseElements() {


  

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
          
          <div class="bg-zinc-200 rounded-md m-3 ">
            <img src="https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe-500x500.jpg" class="object-cover h-48 w-96"/>
            <p>Hambuger</p>
          </div>
          <div class="bg-zinc-200 rounded-md m-3 ">
            <img src="https://senecuisine.com/wp-content/uploads/2020/09/thi%C3%A9bou-dieune.jpg" class="object-cover h-48 w-96"/>
            <p>Thiebou Dieune</p>
          </div>
          <div class="bg-zinc-200 rounded-md m-3 ">
            <img src="https://cdn.chefclub.tools/uploads/recipes/cover-thumbnail/5a8725a0-d866-4917-9e91-d5a33f389c30_hEXYs5a.jpg" class="object-cover h-48 w-96"/>
            <p>Jus Citron</p>
          </div>
          <div class="bg-zinc-200 rounded-md m-3 ">
            <img src="https://recette.supertoinette.com/155452/b/poulet-roti.jpg" class="object-cover h-48 w-96"/>
            <p>Poulet Rotie</p>
          </div>
          <div class="bg-zinc-200 rounded-md m-3 ">
            <img src="https://cdn.chefclub.tools/uploads/recipes/cover-thumbnail/e8eda721-358c-4338-b406-801a7c8a2ddf_xWqVmdB.jpg" class="object-cover h-48 w-96"/>
            <p>Jus de fruits</p>
          </div>
          <div class="bg-zinc-200 rounded-md m-3 ">
            <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dessert-main-image-molten-cake-0fbd4f2.jpg?resize=768,574" class="object-cover h-48 w-96"/>
            <p>Chocolat</p>
          </div>
         
        </div>
      </div>
 
  );
}

export default CaisseElements;