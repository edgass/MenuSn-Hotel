import React, { Component, useEffect } from 'react'
import { addHotel } from '../store/auth-store';
import { useAppSelector } from '../hook';
import { useDispatch } from 'react-redux';
import foodService from '../services/food-service';
import SearchAccess from './searchAccess';
import Dashboard from './Dashboard';


export default function MainHome(){

    const state = useAppSelector(state=>state.authSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchHotel() {
            const hotel = await foodService.searchAccount(state.user.uid);
            console.log(hotel)
           
                dispatch(addHotel({hotel:hotel}));
                console.log(state.hotel);
          
        }
        fetchHotel();
    }, []);

    

  //  const dispatch = useDispatch();
   // const state = useAppSelector(state=>state.addFoodSlice);

    return(
        state.hotel == undefined & state.hotel != "" ? <SearchAccess></SearchAccess> : <Dashboard></Dashboard>
        );
}