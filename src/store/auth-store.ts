import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAuth,signInWithEmailAndPassword} from "firebase/auth";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { auth } from "../firebase.config";
import {User} from "firebase/auth";
import  { Toast } from 'primereact/toast';
import { getFirestore } from "firebase/firestore";
import db from "../firebase.config";
import foodService from "../services/food-service";
import { HotelModel } from "../models/hotel-model";


export interface SignInCredentials {
    email: string;
    password: string;
  }

  interface AuthState {
    user: User | undefined;
    loading: boolean;
    error:string | unknown;
    hotel:HotelModel | unknown;
  }

  const initialState : AuthState = {
    user: undefined,
    loading: false,
    error:"",
    hotel : "",
  }


  


export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials:SignInCredentials,{getState,rejectWithValue}) => {
   
    try{
    
      const response = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      
      return response.user;
    }catch(err){
      
      console.log(err)
      return rejectWithValue(err.message);
    }
 
  }
);

export const authSlice = createSlice({
  
  name: "auth",
  initialState: initialState,
  reducers: {
    clearUserData : (state,action)=>{
      state.user = undefined
    },
    addHotel(state,action){
      state.hotel = action.payload.hotel
    }
  },
  extraReducers:async(builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled,(state, action) =>{
       
        if (action.payload){
          state.user = action.payload;     
        }
        state.loading = false;
      
      })
      .addCase(signIn.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload as string
        console.log(state.error)
    
      });
  },
});

export default authSlice.reducer;
export const {clearUserData,addHotel} = authSlice.actions;
