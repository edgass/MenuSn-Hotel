
import { useEffect, useState } from "react";
import { setOuvertureSessionModalOpen } from "../../../store/ouverture-session-caisse-store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hook";
import SingleCommandeInFermetureCaisse from "./single-command-in-fermeture-caisse";

function Cuisine() {
  const [total,setTotal] = useState(null)
  const ouvrirSessionCaisseState = useAppSelector(state=>state.ouvrirSessionCaisseSlice);
  const closeSessionCaisseState = useAppSelector(state=>state.closeSessionCaisseSlice);
  const recuperationSessionActiveState = useAppSelector(state=>state.recuperationSessionActiveSlice);
  const fetchCommandState = useAppSelector(state=>state.fetchCommandSlice);

  const dispatch = useDispatch();
          
  

  



  useEffect(()=>{
    var total = 0;
    var sousTotal = 0;
    for(let i=0;i<fetchCommandState.entities.length;i++){
     
      if(fetchCommandState.entities[i].state == "Cuisine"){
        for(let j=0;j<fetchCommandState.entities[i].elements.length;j++){
         
          console.log(fetchCommandState.entities[i].elements[j].element)
           sousTotal = sousTotal + parseInt(fetchCommandState.entities[i].elements[j].element.prix)
           console.log(sousTotal)
        }
        total = total + sousTotal;
        setTotal(total);
      }
    }

    console.log(total)

  },[
    dispatch
])


  return (


    <div className="w-full">
      <h1 className="text-green-500 text-bold m-3 text-xl">Cuisine</h1>
      <div className="">
        {
          fetchCommandState.loading == "pending" ?
          <p>Recuperation des donneés</p>:
          fetchCommandState.entities.map((cmd)=>{
            if(cmd.state == "Cuisine" | cmd.state == "cuisine")
              return(
                <SingleCommandeInFermetureCaisse cmd = {cmd} />
              )
          })
        }

      </div>
      <h1 className="m-3 p-3">Total : {total} FCFA</h1>
    </div>
 
  );

}


export default Cuisine;