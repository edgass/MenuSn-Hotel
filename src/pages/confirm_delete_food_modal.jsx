import React,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { deleteFood, setShowConfirmDeleteModal} from '../store/delete-food-store';
import { fetchFoods } from '../store/fetch-food-store';
import { activateFood } from '../store/activate-food-store';
import { updateFood } from '../store/update-food-store';
//import Swal from 'sweetalert2'
import { useAppSelector } from '../hook';
import { ProgressSpinner } from 'primereact/progressspinner';
import { setShowConfirmCommandModal } from '../store/food-store';



export function ConfirmDeleteFoodModal(props){
  
    const deleteFoodState = useAppSelector(state=>state.deleteFoodSlice)
    const updateFoodState = useAppSelector(state=>state.updateFoodState)
    const activateFoodState = useAppSelector(state=>state.activateFoodState)

    const dispatch = useDispatch()

    useEffect(()=>{
        
    },[
        dispatch
    ])
/*

   function openSuccessDeleteFood(arg)
    {
     // const texte = arg.quantity+" "+arg.element.name+" ajouté à votre commande"
      Swal.fire({
        title: 'Succés',
        text: "Ce plat a été supprimé avec succes ",
        type: 'success',
        
      })
    }
*/
    function handleChange(event) {
        console.log(event.target.value);
        setQuantity(parseInt(event.target.value ))
      }

    return(
        <div class="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="flex justify-center bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="flex items-center mx-auto">
            <div class="mt-3 sm:mt-0 sm:ml-4 text-center">
              <h2 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Confirmation de suppression</h2>
              <div className="w-full py-6 grid grid-cols-1">
              <p>Cet élément sera définitivement supprimé et cette action est irréversible.<br/></p>
                <p>Si vous ne souhaitez pas que cet élément apparaisse pour les clients, vous pouvez tout simplement le désactiver.</p>
        </div>
            </div>
          </div>
        </div>
         
        

        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          {deleteFoodState.loading === 'pending' ? 
          <h2>Confirmation de suppression</h2>
          :
          <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={
            ()=>{
            
              dispatch(deleteFood(deleteFoodState.foodIdToDelete));
              dispatch(deleteFoodState === 'pending' ? null : setShowConfirmDeleteModal(false));
              dispatch(fetchFoods());
            
            } 
          }
          >Supprimer</button>
        }
          <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-orange-500 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick= {
          ()=>{
             dispatch(activateFood({foodId:deleteFoodState.foodIdToDelete,activate:false}));
             dispatch(setShowConfirmDeleteModal(false));
          } 
        
          }>Désactiver</button>
          <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={
          ()=>{
            dispatch(setShowConfirmDeleteModal(false));
          } 
        
          }>Annuler</button>

        </div>
        
      </div>
    </div>
  </div>
</div>

    )
}