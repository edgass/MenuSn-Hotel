import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import foodService from "../services/food-service";
import { FoodModel } from "../models/food-model";





  export interface ElementCredentials {
    name : string;
    position : number;
  }


export interface FetchElementState{
    entities : FoodModel[],
    loading : 'idle' | 'pending' | 'succeded' | 'failed',
}



export const initialStateFetchCategory : FetchElementState = {
    entities : [],
    loading : 'idle',
}


export const fetchFoods = createAsyncThunk(
    'food/fetch',
    async (credential:ElementCredentials,{rejectWithValue})=>{
        try{
        
           const elements =  await foodService.getAllElements();
        console.log(elements)
            return elements;
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




export const fetchFoodSlice = createSlice({
    name: 'fetchFoodList',
    initialState: initialStateFetchCategory,
    reducers: {
     
    },
     extraReducers : (builder) =>{
       

        builder.addCase(fetchFoods.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(fetchFoods.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(fetchFoods.fulfilled,(state,action)=>{
            state.loading = 'succeded';
            state.entities = action.payload
           
        });
    } 
})

export default fetchFoodSlice.reducer;

