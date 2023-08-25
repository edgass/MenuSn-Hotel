import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FoodModel } from "../models/food-model";
import foodService from "../services/food-service";
import utilServices from "../services/utils-services";


export interface ActivationCredentials {
    foodId : string;
    activate : boolean;
  }


export interface ActivateFoodCredentials {
    foodIdToUpdate:string,
    actualVisibility : boolean;
  }


export interface ActivateFoodState{
    entities : FoodModel[],
    loading : 'idle' | 'pending' | 'succeded' | 'failed',

  
}

export const initialStateOfAddFood : ActivateFoodState = {
    entities : [],
    loading : 'idle',
    
}

export const activateFood = createAsyncThunk(
    'food/activated',
    async (arg:ActivationCredentials,{rejectWithValue})=>{
        let imagePath : any;
        console.log(arg.activate);
        try{
            return await foodService.activateFood(arg.foodId,arg.activate);
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




export const activateFoodSlice = createSlice({
    name: 'activateFood',
    initialState: initialStateOfAddFood,
    reducers: {
    },
     extraReducers : (builder) =>{
       

        builder.addCase(activateFood.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(activateFood.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(activateFood.fulfilled,(state,action)=>{
            state.loading = 'succeded';
           
        });
    } 
})


export default activateFoodSlice.reducer;
export const {} = activateFoodSlice.actions

