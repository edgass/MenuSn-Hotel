import {useSelector} from "react-redux"
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../hook';

const AuthGard = ({children}) =>{
   
    const state = useAppSelector(state=>state.authSlice);

    if (!state.user?.email){
        return <Navigate to="/signin"/>
    }

    return <div>{children}</div>
};

export default AuthGard;