import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import SingleElementInCommande from "../models/single-element-in-command";
import commandService from "../services/command_service";
import CommandModel from "../models/command_model";


export interface PostNewCommandCredentials {
    hotelId : string;
     emplacement : string;
     caisseId : string;
   }

   
export interface PostNewCommandState{
    entities : SingleElementInCommande[],
    loading : 'idle' | 'pending' | 'succeded' | 'failed',
    showConfirmCommandModal : Boolean,
    showDeleteCommandModal : Boolean

}


export const initialStateOfCommand : PostNewCommandState = {
    entities : [],
    loading : 'idle',
    showConfirmCommandModal : false,
    showDeleteCommandModal : false
}

export const postNewCommand = createAsyncThunk(
    'command/postnewCommand',
    async (arg:PostNewCommandCredentials,{rejectWithValue})=>{
        try{
            console.log("post new command in state console")
            return await commandService.postNewCommand(arg.hotelId,arg.emplacement,arg.caisseId);
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




export const postCommandSlice = createSlice({
    name: 'pstCommand',
    initialState: initialStateOfCommand,
    reducers: {

    },
     extraReducers : (builder) =>{
       

        builder.addCase(postNewCommand.pending,(state)=>{
            state.loading = 'pending'
        });

        
        builder.addCase(postNewCommand.rejected,(state)=>{
            state.loading = 'failed'
          //  state.errorMessage = action;
            
        });

        builder.addCase(postNewCommand.fulfilled,(state,action)=>{
            state.loading = 'succeded';
           
        });
    } 
})

export default postCommandSlice.reducer;
export const {} = postCommandSlice.actions

