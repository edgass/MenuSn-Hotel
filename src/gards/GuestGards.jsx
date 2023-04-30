import {useSelector} from "react-redux"
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../hook';

const GuestGard = ({children}) =>{

    const state = useAppSelector(state=>state.authSlice);
    
    if (state.user?.email){
        return <Navigate to="/"/>
    }

    return <div>{children}</div>
};

export default GuestGard;