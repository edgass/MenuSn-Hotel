import {createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import { FoodModel } from "../models/food-model";
import foodService from "../services/food-service";
import caisseService from "../services/caisse-service";
import { auth } from "../firebase.config";
import { SessionCaisseModel } from "../models/session-caisse-model";
import { recupererSessionActive } from "./recuperation-session-active-store";
import { useDispatch } from "react-redux";

export interface ActivationCommandCredentials {
   commandId : string;
    state : string;
  }



export interface CloseSessionCaisseState{
    entities : SessionCaisseModel[],


    loading : 'idle' | 'pending' | 'succeded' | 'failed',


  
}

export const initialCloseStateOfSessionCaisse : CloseSessionCaisseState = {


    entities : [],
    loading : 'idle',

    
}

export const closeSessionCaisse = createAsyncThunk(
    'caisse/close',
    async (arg:string,{rejectWithValue})=>{
    
        try{
        
            return await caisseService.closeSessionCaisse(arg ?? "");
           
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




export const closeSessionCaisseSlice = createSlice({
    name: 'activateFood',
    initialState: initialCloseStateOfSessionCaisse,
    reducers: {
       
    },
     extraReducers : (builder) =>{
       

        builder.addCase(closeSessionCaisse.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(closeSessionCaisse.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(closeSessionCaisse.fulfilled,(state,action)=>{
            state.loading = 'succeded',
            recupererSessionActive
        });
    } 
})


export default closeSessionCaisseSlice.reducer;
export const {} = closeSessionCaisseSlice.actions

