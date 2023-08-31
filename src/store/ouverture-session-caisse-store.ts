import {createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import { FoodModel } from "../models/food-model";
import foodService from "../services/food-service";
import caisseService from "../services/caisse-service";
import { auth } from "../firebase.config";
import { SessionCaisseModel } from "../models/session-caisse-model";

export interface ActivationCommandCredentials {
   commandId : string;
    state : string;
  }



export interface SessionCaisseState{
    entities : SessionCaisseModel[],
    ouvertureSessionModalOpen : boolean,
    currentCaisseId : string | null | undefined,
    loading : 'idle' | 'pending' | 'succeded' | 'failed',

  
}

export const initialStateOfSessionCaisse : SessionCaisseState = {
    ouvertureSessionModalOpen : false,
    currentCaisseId : null,
    entities : [],
    loading : 'idle',
    
}

export const ouvrirSessionCaisse = createAsyncThunk(
    'food/activated',
    async (arg:string,{rejectWithValue})=>{
       const userId = auth.currentUser?.uid;
        try{
            return await caisseService.postNewCaisse(arg ?? "");
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




export const ouvrirSessionCaisseSlice = createSlice({
    name: 'activateFood',
    initialState: initialStateOfSessionCaisse,
    reducers: {
        setOuvertureSessionModalOpen :(state,action)=>{
           state.ouvertureSessionModalOpen = action.payload;
           
            
        }
    },
     extraReducers : (builder) =>{
       

        builder.addCase(ouvrirSessionCaisse.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(ouvrirSessionCaisse.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(ouvrirSessionCaisse.fulfilled,(state,action)=>{
            state.loading = 'succeded',
            state.currentCaisseId = action.payload
            console.log(state.currentCaisseId)
        });
    } 
})


export default ouvrirSessionCaisseSlice.reducer;
export const {setOuvertureSessionModalOpen} = ouvrirSessionCaisseSlice.actions

