import React, { useState,useRef,useEffect } from 'react';
import { getCommand } from '../../store/change-command-state-store';
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
import SingleElementInNewCommand from './single-element-in -newCommand';
import { postNewCommand } from '../../store/post-command-store';
import { Button } from 'primereact/button';
        

function NewCommand() {


  

  const toast = useRef(null);

  const displayMessage = (severity,summary,details,life) => {
     toast.current.show({ severity: severity, summary: summary, detail: details, life: life });

}
  const dispatch = useDispatch();
  const changeCommandeState = useAppSelector(state=>state.changeCommandStateSlice);
  const postNewCommandState = useAppSelector(state=>state.postCommandSlice);
  const recuperationSessionActiveState = useAppSelector(state=>state.recuperationSessionActiveSlice);
  const [PT, setPT] = useState(0);

  useEffect(()=>{
    dispatch(getCommand());
    var pt = 0;
    let i;
    console.log(changeCommandeState.commandInCaisseEntities)
    for(i=0;i<changeCommandeState.commandInCaisseEntities.length;i++){
       
        pt = pt + parseInt(changeCommandeState.commandInCaisseEntities[i].element.prix * changeCommandeState.commandInCaisseEntities[i].qtt);
    }
    console.log(PT);
    setPT(pt);
  },[
    dispatch
])

  return (


      <div className="">
        
<div class="">
    <div className=''>
    <h4 class="mb-2 ml-2 float-left">Nouvelle Commande</h4>
    {
        changeCommandeState.commandInCaisseEntities.length>0 ? 
        postNewCommandState.loading ==="pending" ?
        <h4 className='float-right'>En cours d'envoie...</h4> : 
        <div class="py-2 px-4 float-right">
            <Button onClick={()=>{dispatch(postNewCommand({hotelId:"",emplacement:"Table 7",caisseId:recuperationSessionActiveState.entities.id}))}} >Valider Commande</Button> 
        </div>
        : null
    }
   
    </div>
    
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Element
                </th>
                <th scope="col" class="px-6 py-3">
                    Quantité
                </th>
                <th scope="col" class="px-6 py-3">
                    PU
                </th>
            </tr>
        </thead>
        <tbody>
            {
                changeCommandeState.commandInCaisseEntities.length == 0 ?
                <h3 className='text-center'>Nouvelle Commande ! ajouter vos plats.</h3> :
                changeCommandeState.commandInCaisseEntities.map((el)=>{
                   return(
                    <SingleElementInNewCommand element= {el} />
                   )
                })
            }
           
            
        </tbody>
    </table>
</div>

      </div>
 
  );
}

export default NewCommand;