import React,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux'
//import Swal from 'sweetalert2'
import { useAppSelector } from '../../hook'; 
import { setChangeStateVisible } from '../../store/fetch-command-store';
import { SingleCommandElementInCommand } from './single_command_element_in_command';
import { changeCommandeState } from '../../store/change-command-state-store';



export function ChangeState(props){
  
    const changeStateState = useAppSelector(state=>state.fetchCommandSlice)
    const updateFoodState = useAppSelector(state=>state.updateFoodState)
    const activateFoodState = useAppSelector(state=>state.activateFoodState)
    const [PT,setPT]=useState(0)

    const dispatch = useDispatch()

    useEffect(()=>{
        var i;
        var pt = 0;
        for(i=0;i<changeStateState.changeStateVisible[1].data().elements.length;i++){
          pt = pt + parseInt(changeStateState.changeStateVisible[1].data().elements[i].element.prix);
        }
        setPT(pt)
        console.log(changeStateState.changeStateVisible[1].id)
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
              <h2 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Détails de la commande</h2>
              <div className="w-full py-6 grid grid-cols-1">
                <div class="flex space-x-12">
                  <p>Emplacement : {changeStateState.changeStateVisible[1].data().emplacement} <br/></p>
                  <p>Etat : {changeStateState.changeStateVisible[1].data().state} <br/></p>
                </div>
              

              <div class="w-full py-6 grid grid-cols-1">
              {
                  changeStateState.changeStateVisible[1].data().elements.map((el)=>
                    (
                      <SingleCommandElementInCommand element= {el} />
                    )
                  )
                }

              <h2 className='font-bold mt-6'>Total : {PT} FCFA</h2>
              </div>
               
            </div>
            </div>
          </div>
        </div>
         
        

        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          {
          changeStateState.changeStateVisible[1].data().state == "Attente" ?
          <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={
            ()=>{
              
              dispatch(changeCommandeState({commandId:changeStateState.changeStateVisible[1].id,state:"Cuisine"}))
            
            } 
          }
          >Envoyer à la cuisine</button> :
          changeStateState.changeStateVisible[1].data().state == "Cuisine" ?
          <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={
            ()=>{
            
              dispatch(changeCommandeState({commandId:changeStateState.changeStateVisible[1].id,state:"Payé"}))
              dispatch(setChangeStateVisible([false,""]));

            
            } 
          }
          >Mentionner Payé</button> :
          null
        }
         <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={
            ()=>{
            
              dispatch(setChangeStateVisible([false,""]));
             
            } 
          }
          >Fermer</button>
        

        </div>
        
      </div>
    </div>
  </div>
</div>

    )
}