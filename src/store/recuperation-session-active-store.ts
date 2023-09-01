import {createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import { FoodModel } from "../models/food-model";
import foodService from "../services/food-service";
import caisseService from "../services/caisse-service";
import { auth } from "../firebase.config";
import { SessionCaisseModel } from "../models/session-caisse-model";





export interface RecuperationSessionActiveState{
    entities : SessionCaisseModel | undefined,
    loading : 'idle' | 'pending' | 'succeded' | 'failed',
    year:number,
    month:number,
    day:number,
    hour:number,
    minutes:number,
    second:number,

  
}

export const initialStateOfRecuperationSessionActive : RecuperationSessionActiveState = {
    entities : undefined,
    loading : 'idle',
    year:0,
    month:0,
    day:0,
    hour:0,
    minutes:0,
    second:0,
    
}

export const recupererSessionActive = createAsyncThunk(
    'session/recupSession',
    async (arg:string,{rejectWithValue})=>{
    
        try{
            return await caisseService.getActiveSession();
        }catch(err){
            return rejectWithValue([]);
        }
    }
);



export const recuperationSessionActiveSlice = createSlice({
    name: 'activateFood',
    initialState: initialStateOfRecuperationSessionActive,
    reducers: {
    
    },
     extraReducers : (builder) =>{
       

        builder.addCase(recupererSessionActive.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(recupererSessionActive.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(recupererSessionActive.fulfilled,(state,action)=>{
            state.loading = 'succeded',
            state.entities = action.payload
            const date = new Date(action.payload?.ouvertureTimestamp ?? "")
            state.year = date.getFullYear(),
            state.month = date.getMonth(),
            state.day = date.getDate(),
            state.hour = date.getHours(),
            state.minutes = date.getMinutes(),
            state.second = date.getSeconds()
           
        });
    } 
})


export default recuperationSessionActiveSlice.reducer;
export const {} = recuperationSessionActiveSlice.actions

