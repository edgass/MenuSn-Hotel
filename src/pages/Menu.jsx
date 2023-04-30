import React, { useState,useRef,useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

import { Dialog } from 'primereact/dialog';
import Element from '../partials/elements/Element'
import { classNames } from 'primereact/utils';

import { DataTable } from 'primereact/datatable';
import AddFood from './add-food';
import { Toast } from 'primereact/toast';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hook';
import { fetchFoods } from '../store/fetch-food-store';
import { ProgressSpinner } from 'primereact/progressspinner';
import UpdateFood from './update-food';
import { FoodModel } from '../models/food-model';
        

function Menu() {


  

  const toast = useRef(null);

  const displayMessage = (severity,summary,details,life) => {
     toast.current.show({ severity: severity, summary: summary, detail: details, life: life });

}
  const dispatch = useDispatch();
  const fetchState = useAppSelector(state=>state.fetchFoodSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [updateFoodVisible, setUpdateFoodVisible] = useState(false);
  const [foodToUpdate, setFoodToUpdate] = useState(new FoodModel('','','','','',0));

  useEffect(()=>{
    dispatch(fetchFoods())
  },[
    dispatch
])

  return (
    <div className="flex h-screen overflow-hidden">
      
      <Toast ref={toast} position="top-right" className="cssclassname"></Toast>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden '>
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
     <div className='px-12 py-12'>
    
      <div class="flex py-6 px-6 justify-between flex-row max-sm:grid ">
        <p className='text-lg'>Mes Nourritures</p>
        <button onClick={() => setVisible(true)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold max-sm:my-4 py-2 px-4 rounded inline-flex items-center">
          <svg class="fill-current w-4 h-4 mr-2" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
          <span>Ajouter une nourriture</span>
        </button>

        <Dialog header="Ajouter nourriture ou boisson" visible={visible} style={{ width: '60vw' }} onHide={() => setVisible(false)}>
          <AddFood message={displayMessage} hideModal={setVisible}></AddFood>
        </Dialog>
        <Dialog header="Mis à jour" visible={updateFoodVisible} style={{ width: '60vw' }} onHide={() => setUpdateFoodVisible(false)}>
          <UpdateFood message={displayMessage} hideModal={setUpdateFoodVisible} foodToUpdate={foodToUpdate}></UpdateFood>
        </Dialog>
      
      </div>
      
      {
      fetchState.loading === 'pending' ? <div className='flex items-center justify-center'><ProgressSpinner></ProgressSpinner></div> : 
      <div className='grid md:grid-cols-3 lg:grid-cols-4  sm:grid-cols-1 gap-4'>
      { fetchState.entities.map((plat) => (<Element plat ={plat} setFood={setFoodToUpdate} hideModal={setUpdateFoodVisible}/>))}
    </div>
      
      }
   
       
     </div>
    </div>
    </div>
  );
}

export default Menu;