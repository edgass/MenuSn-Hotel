import { useDispatch } from "react-redux";
import {useEffect} from 'react';
import { useAppSelector } from "../../hook";
import { deleteFood } from "../../store/delete-food-store";

function Element(props){


    const dispatch = useDispatch();
    const deleteState = useAppSelector(state=>state.deleteFoodSlice);

    useEffect(()=>{
        console.log(props.plat[1]);
      },[
        dispatch
    ])


    return(
        
<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-end px-4 pt-4">
       <div>
        <div></div>
       <p className="text-red-600 text-bold">Inactif</p>
       </div>
           
        
       {/* Dropdown menu */}
   
    </div>
    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={props.plat[0].imagepath} alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{props.plat[0].name}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{props.plat[0].prix} FCFA</span>
        <div class="flex mt-4 space-x-3 md:mt-6 grid grid-cols-2 px-6 justify-center">
            <button onClick={()=>{
                props.setFood(props.plat),
                props.hideModal(true)
            }}>
            <a class="my-2  items-center px-4 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modifier</a>
            </button>
            <button onClick={()=>{
                dispatch(deleteFood(props.plat[1]));
            }}>
            <a class="my-2 items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Supprimer</a>
            </button>
        </div>
    </div>
</div>

    )
}

export default Element;