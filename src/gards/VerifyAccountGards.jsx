import {useSelector} from "react-redux"
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../hook';

const VerifyAccountGard = ({children}) =>{

    const state = useAppSelector(state=>state.authSlice);
    
    if (state.user.email & state.seachingUserAccess == true){
        return <Navigate to="/"/>
    }

    return <div>{children}</div>
};

export default VerifyAccountGard;