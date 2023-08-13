import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FoodModel } from "../models/food-model";
import foodService from "../services/food-service";
import utilServices from "../services/utils-services";



export interface DeleteFoodState{
    loading : 'idle' | 'pending' | 'succeded' | 'failed',
    showConfirmDeleteFood : Boolean
}

export const initialStateOfDeleteFood : DeleteFoodState = {
    loading : 'idle',
    showConfirmDeleteFood : false
}

export const deleteFood = createAsyncThunk(
    'food/delete',
    async (credential:string,{rejectWithValue})=>{
        try{
            return await foodService.deleteFood(credential);
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




export const deleteFoodSlice = createSlice({
    name: 'command',
    initialState: initialStateOfDeleteFood,
    reducers: {
        setShowConfirmDeleteModal(state,action){
            state.showConfirmDeleteFood = action.payload;
        }
    },
     extraReducers : (builder) =>{
       

        builder.addCase(deleteFood.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(deleteFood.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(deleteFood.fulfilled,(state,action)=>{
            state.loading = 'succeded';
           
        });
    } 
})


export default deleteFoodSlice.reducer;
export const {setShowConfirmDeleteModal} = deleteFoodSlice.actions

