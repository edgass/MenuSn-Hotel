import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FoodModel } from "../models/food-model";
import foodService from "../services/food-service";
import utilServices from "../services/utils-services";





export interface FoodCredentials {
    categoryId : string;
    description : string;
    hotelId: string;
    image: string;
    name: string;
    prix: number;
    file:File;
  }


export interface AddFoodState{
    entities : FoodModel[],
    loading : 'idle' | 'pending' | 'succeded' | 'failed',
    showConfirmAddFood : Boolean
}

export const initialStateOfAddFood : AddFoodState = {
    entities : [],
    loading : 'idle',
    showConfirmAddFood : false
}

export const postNewFood = createAsyncThunk(
    'food/new',
    async (credential:FoodCredentials,{rejectWithValue})=>{
        try{
            const imagePath = await utilServices.handleUpload(credential.file);
            console.log(imagePath)
            return await foodService.postNewFood(credential.categoryId,credential.description,credential.hotelId,credential.image,credential.name,credential.prix,imagePath);
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




export const addFoodSlice = createSlice({
    name: 'command',
    initialState: initialStateOfAddFood,
    reducers: {
        setShowConfirmCommandModal(state,action){
            state.showConfirmAddFood = action.payload;
        }
    },
     extraReducers : (builder) =>{
       

        builder.addCase(postNewFood.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(postNewFood.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(postNewFood.fulfilled,(state,action)=>{
            state.loading = 'succeded';
           
        });
    } 
})


export default addFoodSlice.reducer;
export const {setShowConfirmCommandModal} = addFoodSlice.actions

