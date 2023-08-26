import React, { useState,useRef,useEffect } from 'react';
import db from '../../firebase.config';

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
import { fetchCommand } from '../../store/fetch-command-store';
import SingleCommand from './single-command';
        

function ListeCommand() {


  

  const toast = useRef(null);

  const displayMessage = (severity,summary,details,life) => {
     toast.current.show({ severity: severity, summary: summary, detail: details, life: life });

}
  const dispatch = useDispatch();
  const fetchState = useAppSelector(state=>state.fetchFoodSlice);
  const fetchCommandState = useAppSelector(state=>state.deleteFoodSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [updateFoodVisible, setUpdateFoodVisible] = useState(false);
  const [deleteFoodVisible, setDeleteFoodVisible] = useState(false);
  const [listOfCommand, setListOfCommand] = useState([]);

  useEffect(()=>{
   
db.collection("commande")
.onSnapshot((snap) => {
   setListOfCommand([])
    snap.forEach((doc) => {
        var data = doc;
        setListOfCommand(arr=>[...arr,data]);
        
});

})
  },[
    dispatch
])

  return (


      <div className="">
        
<div class="">
    <h4 class="mb-2 ml-2">Commandes</h4>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Emplacement
                </th>
                <th scope="col" class="px-6 py-3">
                    PT (FCFA)
                </th>
                <th scope="col" class="px-6 py-3">
                    Etat
                </th>
            </tr>
        </thead>
        <tbody>
            {
                listOfCommand.map((cmd)=>{
                   return(
                    <SingleCommand command= {cmd} />
                   )
                })
            }

            
        </tbody>
    </table>
</div>

      </div>
 
  );
}

export default ListeCommand;






