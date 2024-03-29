import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FoodModel } from "../models/food-model";
import foodService from "../services/food-service";
import utilServices from "../services/utils-services";
import { CategoryModel } from "../models/category";




  export interface CategoryCredentials {
    name : string;
    position : number;

  }


export interface FetchCategoryState{
    entities : CategoryModel[],
    loading : 'idle' | 'pending' | 'succeded' | 'failed',
    categoryIdForSearchingElements:string | null,
}



export const initialStateFetchCategory : FetchCategoryState = {
    entities : [],
    loading : 'idle',
    categoryIdForSearchingElements:null,

}


export const fetchCategory = createAsyncThunk(
    'food/newFetchCategory',
    async (credential:CategoryCredentials,{rejectWithValue})=>{
        try{
        
           const categorys =  await foodService.fetchCategorys();
            return categorys;
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




export const fetchCategorySlice = createSlice({
    name: 'fetchCategoryList',
    initialState: initialStateFetchCategory,
    reducers: {
     setCategoryForElementSearching:(state,action)=>{
        state.categoryIdForSearchingElements = action.payload;
        console.log(state.categoryIdForSearchingElements)
     }
    },
     extraReducers : (builder) =>{
       

        builder.addCase(fetchCategory.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(fetchCategory.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(fetchCategory.fulfilled,(state,action)=>{
            state.loading = 'succeded';
            state.entities = action.payload
           
        });
    } 
})

export default fetchCategorySlice.reducer;
export const {setCategoryForElementSearching} = fetchCategorySlice.actions;

