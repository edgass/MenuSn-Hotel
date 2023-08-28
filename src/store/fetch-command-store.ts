import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FoodModel } from "../models/food-model";
import foodService from "../services/food-service";
import utilServices from "../services/utils-services";
import { CategoryModel } from "../models/category";
import commandService from "../services/command_service";
import CommandModel from "../models/command_model";






export interface FetchCommandState{
    entities : CommandModel[],
    loading : 'idle' | 'pending' | 'succeded' | 'failed',
    changeStateVisible : any
}



export const initialStateOfFetchCommand : FetchCommandState = {
    entities : [],
    loading : 'idle',
    changeStateVisible : [false,""]

}


export const fetchCommand = createAsyncThunk(
    'food/fetchCommand',
    async (credential:null,{rejectWithValue})=>{
        try{
        
           const commands =  await commandService.getCommands();
            return commands;
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




export const fetchCommandSlice = createSlice({
    name: 'fetchCommand',
    initialState: initialStateOfFetchCommand,
    reducers: {
        setChangeStateVisible: (state,action)=>{
            
            state.changeStateVisible = action.payload;
            console.log(state.changeStateVisible)
        }
    },
     extraReducers : (builder) =>{
       

        builder.addCase(fetchCommand.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(fetchCommand.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(fetchCommand.fulfilled,(state,action)=>{
            state.loading = 'succeded';
            state.entities = action.payload
            state.changeStateVisible(false)
           
        });
    } 
})

export default fetchCommandSlice.reducer;
export const {setChangeStateVisible} = fetchCommandSlice.actions;


