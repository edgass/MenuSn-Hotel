import { Route, Routes } from "react-router-dom";
import AuthGard from "../gards/AuthGards";
import GuestGard from "../gards/GuestGards";
import VerifyAccountGard from "../gards/VerifyAccountGards";
import Dashboard from "../pages/Dashboard";
import { Login } from "../pages/login";
import SearchAccess from "../pages/searchAccess";
import Menu from "../pages/Menu";
import MainHome from "../pages/MainHome";


const Navigation = ()=>(
    <Routes>
        <Route path="/" element={
            <AuthGard>
                <MainHome/>
            </AuthGard>
        }/>
        <Route exact path="/dashboard/menu" element={
            <AuthGard>
                <Menu />
            </AuthGard>
        } />
        <Route path="/signin" element={
            <GuestGard>
                <Login/>
            </GuestGard>
        }/>
    </Routes>
);

export default Navigation;