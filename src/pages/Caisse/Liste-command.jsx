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

  const displayMessage = (severity,summary,details,life) => {
     toast.current.show({ severity: severity, summary: summary, detail: details, life: life });

}
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [updateFoodVisible, setUpdateFoodVisible] = useState(false);
  const [deleteFoodVisible, setDeleteFoodVisible] = useState(false);
  const [listOfCommandToShow, setListOfCommandToShow] = useState([]);
  const [listOfCommandFromDatase, setListOfCommandFromDatabase] = useState([]);



  function filterElements (idToSearch){
    //let a = ["foo","fool","cool","god"];
   
    if(idToSearch === "" || idToSearch === null || idToSearch === undefined){
        
        setListOfCommandToShow(listOfCommandFromDatase);
    }else{
    
        let b = listOfCommandFromDatase.filter(item => item.id.toLowerCase().indexOf(idToSearch.toLowerCase()) > -1);
        console.log(b)
            setListOfCommandToShow(b);
       
    }
   
  }

  useEffect(()=>{
   
db.collection("commande").orderBy("state")
.onSnapshot((snap) => {
    setListOfCommandToShow([])
    setListOfCommandFromDatabase([])
    snap.forEach((doc) => {
      
        setListOfCommandFromDatabase(arr=>[...arr,doc]);
        setListOfCommandToShow(arr=>[...arr,doc]);
        
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
        <input onChange={(e)=>filterElements(e.target.value)} type="text" placeholder='Rechercher...' id="default-input" class="m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {
                listOfCommandToShow.map((cmd)=>{
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






