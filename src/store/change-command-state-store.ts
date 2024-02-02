import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FoodModel } from "../models/food-model";
import foodService from "../services/food-service";
import utilServices from "../services/utils-services";
import SingleElementInCommande from "../models/single-element-in-command";


export interface ActivationCommandCredentials {
   commandId : string;
    state : string;
  }



export interface ChangeCommandStateState{
    entities : FoodModel[],
    commandInCaisseEntities: SingleElementInCommande[],
    currentQtt :string,
    selectedElement : FoodModel | null
    newNumberTyping: boolean,
    backSpaceDelete: boolean,
    loading : 'idle' | 'pending' | 'succeded' | 'failed',

  
}

export const initialStateOfAddFood : ChangeCommandStateState = {
    commandInCaisseEntities : [],
    selectedElement: new FoodModel("","","","","",0,""),
    newNumberTyping : true,
    backSpaceDelete : false,
    currentQtt : "",
    entities : [],
    loading : 'idle',
    
}

export const changeCommandeState = createAsyncThunk(
    'food/activated',
    async (arg:ActivationCommandCredentials,{rejectWithValue})=>{
        let imagePath : any;
        try{
            return await foodService.changeCommandState(arg.commandId,arg.state);
        }catch(err){
            return rejectWithValue([]);
        }
    }
);


/*  export const getCommandFromLocalStorage = createAsyncThunk(
    'command/get',
    async (arg:string,{getState,rejectWithValue})=>{    
        try{
            const storedValue = localStorage.getItem("command");

        }catch(err){
            console.log(err)
            return rejectWithValue([]);
        }
    }
);  */




export const changeCommandStateSlice = createSlice({
    name: 'activateFood',
    initialState: initialStateOfAddFood,
    reducers: {
        setBackSpaceDelete : (state,action)=>{
            state.backSpaceDelete = action.payload
        },
        setNewNumberTyping :(state,action)=>{
           state.newNumberTyping = action.payload
            
        },
        getCommand :(state,action)=>{
            const storedValue = localStorage.getItem("commandInCaisse");
            if(storedValue !== null && storedValue !== ""){
                state.commandInCaisseEntities = JSON.parse(storedValue ?? "");
            }
            
        },
        setCommand :(state,action)=>{
         try{
                const storedValue = localStorage.getItem("commandInCaisse");
                console.log(storedValue)
                state.commandInCaisseEntities = [];
                console.log(action.payload)
                if(storedValue == null){
                    state.commandInCaisseEntities = [action.payload]
                    localStorage.setItem("commandInCaisse",JSON.stringify(state.commandInCaisseEntities))
                }else{

                    const actualValues = JSON.parse(storedValue ?? "");
                    const element = actualValues.find((el: { element: { name: any; prix: any; }; }) => el.element.name === action.payload.element.name && el.element.prix === action.payload.element.prix);
                    if(element !== null && element !== undefined){
            
                        actualValues.map((item: SingleElementInCommande)=>{
                            if(item.element.name === action.payload.element.name && item.element.prix === action.payload.element.prix){
                                console.log("it exist")
                                let  newQtt = 0;
                                if(action.payload.isSimpleAdd){
                                     newQtt = item.quantity+action.payload.quantity
                                     console.log("new simple add and new qtt is: "+newQtt)
                            
                                 }else{
                                   
                                  if(state.backSpaceDelete){
                                    if(item.quantity>9){
                                        console.log("Superieur a 9")
                                        newQtt = Math.floor(item.quantity / 10);
                                        console.log(newQtt)
                                    }else{
                                        state.newNumberTyping = true;
                                        newQtt = 1;
                                    }
                                    
                                  }else{
                                
                                    console.log(state.newNumberTyping)
                                    if(state.newNumberTyping){
                                    newQtt = action.payload.quantity
                                    }else{
                                        console.log("Concatenation")
                                        var concatenedQtt = item.quantity.toString() +action.payload.quantity.toString();
                                        newQtt = parseInt(concatenedQtt);
                                    }
                                    }

                                  
                              
                        
                                   
                                }
                                const newValueOfExistedElementInCommand = new SingleElementInCommande(action.payload.element,newQtt,true)
                                state.commandInCaisseEntities = [...state.commandInCaisseEntities, newValueOfExistedElementInCommand]
                            }else{
                                console.log("exist but is different")
                                console.log(item)
    
                                state.commandInCaisseEntities = [...state.commandInCaisseEntities,item]
                                console.log(state.commandInCaisseEntities)
    
                            }
                        })
                    }else{
                        console.log("element non existant")
                        console.log(element)

                        state.commandInCaisseEntities = [...actualValues,action.payload]
                    }
                    localStorage.removeItem("commandInCaisse")
                    
                    localStorage.setItem("commandInCaisse",JSON.stringify(state.commandInCaisseEntities))
                    
                 
                }
               console.log(state.entities.length)

            }catch(e){
                console.log(e)
            }
           
         //  console.log(state.elementToSearch)
           
          //  console.log(state.elementToSearch);
        },
       

        removeItem :(state,action)=>{
        
                try {
                    const storedValue = localStorage.getItem("commandInCaisse");
                    if (storedValue !== null) {
                        const actualValues = JSON.parse(storedValue);
                        const updatedValues = actualValues.filter((item) => {
                            console.log(action.payload.name);
                            return !(item.element.name === action.payload.name && item.element.prix === action.payload.prix);
                        });
                        localStorage.removeItem("commandInCaisse");
                        state.commandInCaisseEntities = [...updatedValues]
                        localStorage.setItem("commandInCaisse", JSON.stringify(updatedValues));
                    }
                } catch (error) {
                    console.log(error);
                }
          
            
        },

        setSelectedElement : (state,action)=> {
            state.newNumberTyping = true;
            state.selectedElement = action.payload;
            console.log(state.selectedElement)
        },

        removeAllElementInCommand : (state,action)=>{
            state.commandInCaisseEntities = []; 
            localStorage.removeItem("commandInCaisse");
        },

        changeCurrentElementQuantity:(state,action)=>{
            var i=0;
            var newElementCopyArray : SingleElementInCommande[];
            newElementCopyArray = [];
            for(i=0;i<state.commandInCaisseEntities.length;i++){
                if(state.commandInCaisseEntities[i].element.name !== state.selectedElement?.name && state.commandInCaisseEntities[i].element.prix !== state.selectedElement?.prix){
                    newElementCopyArray = [...newElementCopyArray,state.commandInCaisseEntities[i]];
                    
                }else{
                    newElementCopyArray = [...newElementCopyArray,new SingleElementInCommande(state.commandInCaisseEntities[i].element,action.payload,true)];
                    
                }
            }
            state.commandInCaisseEntities = newElementCopyArray;
           
            localStorage.setItem("commandInCaisse",JSON.stringify(state.commandInCaisseEntities));
        },

        setCurrentQuantity:(state,action)=>{
            console.log(action)
            if(state.currentQtt==""){
              state.currentQtt = action.payload
            }else{
            state.currentQtt = state.currentQtt+action.payload
              
            }
            
            console.log(state.currentQtt)
        }
    },
     extraReducers : (builder) =>{
       

        builder.addCase(changeCommandeState.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(changeCommandeState.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(changeCommandeState.fulfilled,(state,action)=>{
            state.loading = 'succeded';
           
        });
    } 
})


export default changeCommandStateSlice.reducer;
export const {setBackSpaceDelete,setNewNumberTyping,getCommand,setCommand,removeItem, setSelectedElement,removeAllElementInCommand,changeCurrentElementQuantity,setCurrentQuantity} = changeCommandStateSlice.actions

