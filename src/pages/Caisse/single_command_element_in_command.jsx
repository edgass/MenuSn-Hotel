import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hook";

export function SingleCommandElementInCommand(props){

    const dispatch = useDispatch();


    return(
       
        <div className="my-2 flex flex-row">
        {  <div style={{backgroundImage:`url(${props.element.element.imagepath})`}} className="w-12 bg-black h-12 rounded-full shadow-xl bg-center bg-cover"/>  }
        <div className='ml-2 flex flex-col items-left'>
            <p className="font-semibold text-left">{props.element.element.name}</p>
            <div className='flex flex-row justify-between space-x-12'>
                <p>Quantité : {props.element.quantity}</p>
                <p className='text-right'>{props.element.quantity*props.element.element.prix} FCFA</p>
            </div>
            
            
        </div>
        <h2></h2>
        </div>
        
    )
}