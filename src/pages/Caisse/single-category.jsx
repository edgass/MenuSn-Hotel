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
import { setCategoryForElementSearching } from '../../store/fetch-category-store';
import { fetchFoodsByCategory } from '../../store/fetch-food-by-category-store'; 
import { Button } from 'primereact/button';
        

function SingleCategory(props) {


  
    const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const categoryState = useAppSelector(state => state.fetchCategorySlice)



  useEffect(()=>{

  },[
   
])
    const setCat= ()=>{
        dispatch(setCategoryForElementSearching(props.category.id));
        dispatch(fetchFoodsByCategory(props.category.id));
    }
 
  return (


      <div className="">
            {categoryState.categoryIdForSearchingElements === props.category.id ?
                <div onClick={()=>setCat()} class="bg-green-200 rounded-md m-3 "><p class="px-7 py-8 text-center text-neutral-800">{props.category.nom}  </p></div> :
                <div onClick={()=>setCat()} class="bg-slate-200 rounded-md m-3 "><p class="px-7 py-8 text-center text-neutral-800">{props.category.nom}  </p></div>
           
             } 
         </div>
  );
}

export default SingleCategory;