import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import foodService from "../services/food-service";
import { FoodModel } from "../models/food-model";




export interface FetchElementState{
    entities : FoodModel[],
    loading : 'idle' | 'pending' | 'succeded' | 'failed',
}



export const initialStateFetchCategory : FetchElementState = {
    entities : [],
    loading : 'idle',
}


export const fetchFoodsByCategory = createAsyncThunk(
    'food/fetchByCat',
    async (catId:string,{rejectWithValue})=>{
        try{
        
           const elements =  await foodService.getAllElementsByCategory(catId);
        console.log(elements)
            return elements;
        }catch(err){
            return rejectWithValue([]);
        }
    }
);


export const fetchFoodByCategorySlice = createSlice({
    name: 'fetchFoodListByCat',
    initialState: initialStateFetchCategory,
    reducers: {
     
    },
     extraReducers : (builder) =>{
       

        builder.addCase(fetchFoodsByCategory.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(fetchFoodsByCategory.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(fetchFoodsByCategory.fulfilled,(state,action)=>{
            state.loading = 'succeded';
            state.entities = action.payload
           
        });
    } 
})

export default fetchFoodByCategorySlice.reducer;

