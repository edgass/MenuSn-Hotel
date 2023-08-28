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
    selectedElement : FoodModel | null
    loading : 'idle' | 'pending' | 'succeded' | 'failed',

  
}

export const initialStateOfAddFood : ChangeCommandStateState = {
    commandInCaisseEntities : [],
    selectedElement: new FoodModel("","","","","",0,""),
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
                    console.log("commandes dans la cache actuel : ")
                    console.log(storedValue)
                    const element = actualValues.find((el: { element: { name: any; prix: any; }; }) => el.element.name === action.payload.element.name && el.element.prix === action.payload.element.prix);
                    if(element !== null && element !== undefined){
                        console.log(element)
                        actualValues.map((item: SingleElementInCommande)=>{
                            if(item.element.name === action.payload.element.name && item.element.prix === action.payload.element.prix){
                                console.log("it exist")
                                const newQtt = item.qtt+action.payload.qtt
                                const newValueOfExistedElementInCommand = new SingleElementInCommande(action.payload.element,parseInt(newQtt))
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

        setSelectedElement : (state,action)=> {
            state.selectedElement = action.payload;
            console.log(state.selectedElement)
        },

        removeAllElementInCommand : (state,action)=>{
            state.commandInCaisseEntities = []; 
            localStorage.removeItem("commandInCaisse");
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
export const {getCommand,setCommand,setSelectedElement,removeAllElementInCommand} = changeCommandStateSlice.actions

