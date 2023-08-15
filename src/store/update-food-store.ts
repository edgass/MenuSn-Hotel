import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FoodModel } from "../models/food-model";
import foodService from "../services/food-service";
import utilServices from "../services/utils-services";





export interface FoodCredentials {
    foodIdToUpdate:string,
    categoryId : string;
    description : string;
    hotelId: string;
    image: string;
    name: string;
    prix: number;
    file:File;
  }


export interface UpdateFoodState{
    entities : FoodModel[],
    loading : 'idle' | 'pending' | 'succeded' | 'failed',
    showConfirmAddFood : Boolean,
  
}

export const initialStateOfAddFood : UpdateFoodState = {
    entities : [],
    loading : 'idle',
    showConfirmAddFood : false
    
}

export const updateFood = createAsyncThunk(
    'food/new',
    async (credential:FoodCredentials,{rejectWithValue})=>{
        try{
            const imagePath = await utilServices.handleUpload(credential.file);
            console.log(imagePath)
       //     return await foodService.postNewFood(credential.categoryId,credential.description,credential.hotelId,credential.image,credential.name,credential.prix,imagePath);
            return await foodService.updateFood(credential.foodIdToUpdate, credential.categoryId,credential.description,credential.hotelId,credential.image,credential.name,credential.prix,imagePath);
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




export const updateFoodSlice = createSlice({
    name: 'command',
    initialState: initialStateOfAddFood,
    reducers: {
        setShowConfirmCommandModal(state,action){
            state.showConfirmAddFood = action.payload;
        }
    },
     extraReducers : (builder) =>{
       

        builder.addCase(updateFood.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(updateFood.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(updateFood.fulfilled,(state,action)=>{
            state.loading = 'succeded';
           
        });
    } 
})


export default updateFoodSlice.reducer;
export const {setShowConfirmCommandModal} = updateFoodSlice.actions

