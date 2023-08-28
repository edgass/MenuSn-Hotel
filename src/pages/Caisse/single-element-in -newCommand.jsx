import React, { useState,useRef,useEffect } from 'react';
import { setSelectedElement } from '../../store/change-command-state-store';
import './Caisse.css';
import { setChangeStateVisible } from '../../store/fetch-command-store';

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
import { fetchCommand } from '../../store/fetch-command-store';
        

function SingleElementInNewCommand(props) {



  const dispatch = useDispatch();
  const fetchState = useAppSelector(state=>state.fetchFoodSlice);
  const changeCommandeState = useAppSelector(state=>state.changeCommandStateSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [updateFoodVisible, setUpdateFoodVisible] = useState(false);
  const [deleteFoodVisible, setDeleteFoodVisible] = useState(false);
  const [PT, setPT] = useState(0);

  useEffect(()=>{
    /*
    var pt = 0;
    let i;

    for(i=0;i<props.command.data().elements.length;i++){
      
        pt = pt + parseInt(props.ele.data().elements[i].element.prix * props.command.data().elements[i].element.qtt);
    }
    setPT(pt);
    */
    
  },[
    dispatch
])

  return (

            <tr onClick={()=>dispatch(setSelectedElement(props.element.element))} 
           
            class=  {props.element.element.name == changeCommandeState.selectedElement.name && props.element.element.prix == changeCommandeState.selectedElement.prix ? "bg-blue-100 border-b dark:bg-gray-800 dark:border-orange-700" : "bg-white border-b dark:bg-gray-800 dark:border-orange-700"}>
                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {props.element.element.name}
                </th>
                <td class="px-6 py-4">
                {props.element.qtt}
                </td>
                <td class="px-6 py-4">
                {props.element.element.prix} FCFA
                </td>
            </tr>
 
  );
}

export default SingleElementInNewCommand;