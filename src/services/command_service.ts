import db from "../firebase.config";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { CategoryModel } from "../models/category"; 
import { FoodModel } from "../models/food-model";
import Command from "../models/command_model";


//const elementsCollectionRef = collection(db, "elements");


export class CommandService{

    

    
   // async postNewCommand(hotelId:string,tableId:String,) : Promise<Element[]>{
        async postNewCommand(hotelId:string,tableId:String,){
            var elements : Element[] = [];
            const storedValue = localStorage.getItem("command");
            if(storedValue !== null && storedValue !== ""){
                elements = JSON.parse(storedValue ?? "");
            }
       
        try{
             // Ajouter un nouveau document à la collection "commandes"
    const docRef = await addDoc(collection(db, "commande"), {
        hotelId:"dkzhbzek",
        emplacement: "hjvkh",
        printed:false,
        delivered: false,
        elements: elements,
        
      });
  
      console.log("Commande créée avec succès !", docRef.id);
      return docRef.id;
        }catch(e){
            console.log(e);
        
        }
    }

        
            async getCommands() : Promise<Command[]>{
       
                var commands : Command[] = [];
                try{
                    const resp = db.collection('commande');
                    // var data= await resp.get();
                     var data= await resp.get();
                 
                         data.docs.forEach(item=>{
                             console.log(item.data())
                             commands = [...commands,item.data()] as Command[];
                      //  var element : Element = new Element(item.id,item.data().name,item.data().userId,item.data().name,item.data().prix,item.data().image,item.data().description);
                        //   elements = [...elements,element] as Element[];
                            })
                       //  console.log(elements)
                                     return commands;  
                }catch(e){
                    console.log(e);
                    return commands
                }
            }
        


}

const commandService = new CommandService();
export default commandService;